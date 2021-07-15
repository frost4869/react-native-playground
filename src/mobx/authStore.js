import appleAuth, {
  AppleAuthCredentialState,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-community/async-storage';
import firebaseAuth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {action, observable} from 'mobx';
import queryString from 'query-string';
import {Alert, Linking, NativeModules} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import trackApi from '../api/trackApi';
import constants from '../constants';

const {RNTwitterSignIn} = NativeModules;
RNTwitterSignIn.init(
  'S9DsJKF31DZFw0gHDyad2EPAF',
  'iC1O8QD3RWhhaWKEJZIP8zSv4joEgfzB0izNmIvYPNUoP5i50r',
);

class AuthStore {
  constructor(rootstore) {
    this.rootstore = rootstore;
  }

  @observable isLoading = false;
  @observable error;
  @observable isAuthenticated = false;
  @observable email;
  cachedCredential = null;

  getProviderName = (provider) => {
    switch (provider) {
      case 'facebook.com':
        return {
          name: 'Facebook',
          action: () => this.firebaseLoginFB(),
        };
      case 'password':
        return {
          name: 'Email and Password',
        };
      default:
        return null;
    }
  };

  @action
  onFirebaseAuthStateChanged = (user) => {
    if (user) {
      this.isAuthenticated = true;
      this.email = user.displayName;

      if (this.cachedCredential) {
        const currentUser = firebaseAuth().currentUser;
        currentUser.linkWithCredential(this.cachedCredential);

        this.cachedCredential = null;
      }
    }
    console.log('user :>> ', user);
  };

  @action
  firebaseEmailPassAuthRegister = (email, password) => {
    firebaseAuth()
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        console.log('credential :>> ', credential);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        Alert.alert('Error', error.message);
      });
  };
  @action
  firebaseEmailPassAuth = (email, password) => {
    firebaseAuth()
      .signInWithEmailAndPassword(email, password)
      .then((credential) => {
        console.log('credential :>> ', credential);
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  @action
  firebaseLoginGoogle = () => {
    GoogleSignin.signIn()
      .then(async ({idToken, user}) => {
        const googleCredential = firebaseAuth.GoogleAuthProvider.credential(idToken);
        const providers = await firebaseAuth().fetchSignInMethodsForEmail(user.email);
        console.log('providers :>> ', providers);
        if (providers.length > 0 && !providers.includes('google.com')) {
          // have never signin using google => demand signin with first provider
          this.cachedCredential = googleCredential;
          const {name, action} = this.getProviderName(providers[0]);
          Alert.alert('Oops', `Please signin with your ${name} first to use this signin method`, [
            {
              text: 'Ok',
              onPress: action,
              style: action ? 'default' : 'cancel',
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]);
        } else {
          firebaseAuth().signInWithCredential(googleCredential);
        }
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
        console.log('error :>> ', error);
      });
  };

  @action
  firebaseLoginFB = async () => {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = firebaseAuth.FacebookAuthProvider.credential(data.accessToken);

    firebaseAuth()
      .signInWithCredential(facebookCredential)
      .catch((error) => {
        Alert.alert('Error', error.message);
        console.log('error :>> ', error.code);
      });
  };

  @action
  firebaseLoginTwitter = async () => {
    // Perform the login request
    RNTwitterSignIn.logIn()
      .then(({authToken, authTokenSecret}) => {
        // Create a Twitter credential with the tokens
        const twitterCredential = firebaseAuth.TwitterAuthProvider.credential(
          authToken,
          authTokenSecret,
        );

        // Sign-in the user with the credential
        firebaseAuth()
          .signInWithCredential(twitterCredential)
          .catch((error) => {
            Alert.alert('Error', error.message);
            console.log('error :>> ', error);
          });
      })
      .catch((error) => {
        console.log('error :>> ', error);
      });
  };

  @action
  login = async ({email, password}) => {
    try {
      this.isLoading = true;
      this.error = undefined;
      const resp = await trackApi.post('/signin', {
        email,
        password,
      });
      if (resp.ok && resp.data) {
        const {token} = resp.data;
        this.setAccessToken(token);
        this.isAuthenticated = true;
        this.email = email;
      } else {
        this.error = resp.data;
      }
    } catch (error) {
      this.error = error;
      Alert.alert('Error', error.message);
    } finally {
      this.isLoading = false;
    }
  };

  // HANDLE APPLE AUTHENTICATION FOR IOS >= 13 ONLY
  // USING BUILT-IN SDK FOR APPLE ID AUTHENTICATION
  @action
  appleAuth = async () => {
    try {
      this.isLoading = true;
      this.error = undefined;
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      // use credentialState response to ensure the user is authenticated
      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        // user is authenticated
        console.log('appleAuthRequestResponse :>> ', appleAuthRequestResponse);
        const {identityToken: token, nonce} = appleAuthRequestResponse;
        const resp = await trackApi.post('/apple', {
          appleId: token,
          nonce,
        });
        if (resp.ok && resp.data) {
          const {token: accessToken, email} = resp.data;
          this.setAccessToken(accessToken);
          this.isAuthenticated = true;
          this.email = email;
        } else {
          this.error = resp.data;
        }
      } else {
        this.error = {
          message: 'Authentication failed',
        };
      }
    } catch (error) {
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  };

  @action
  appleOauth = async () => {
    try {
      this.isLoading = true;
      this.error = undefined;
      const url = constants.APPLE_OAUTH_ENDPOINT;
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, constants.DEEPLINK_PREFIX, {
          ephemeralWebSession: false,
        }).then((resp) => {
          if (resp.type === 'success' && resp.url) {
            const searchString = resp.url.split(constants.DEEPLINK_PREFIX)[1];
            const data = queryString.parse(searchString);
            if (data && data.token && data.email) {
              this.setAccessToken(data.token);
              this.email = data.email;
              this.isAuthenticated = true;
            }
          }
        });
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  };

  setAccessToken = (token) => {
    AsyncStorage.setItem(constants.ASYNC_ACCESS_TOKEN, token);
  };

  @action
  overrideLogin = () => {
    this.isAuthenticated = true;
  };

  @action
  logout = () => {
    this.isAuthenticated = false;
    this.email = null;

    firebaseAuth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
}

export default AuthStore;
