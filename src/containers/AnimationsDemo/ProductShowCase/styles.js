import {Dimensions, StyleSheet} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const IMAGE_WIDTH = SCREEN_WIDTH * 0.7;
const TEXT_LENGTH = 300;
const TEXT_HEIGHT = 40;
const OFFSET = TEXT_LENGTH / 2 - TEXT_HEIGHT / 2;

export const TICKER_HEIGHT = 40;
export const PAGING_DOT_WIDTH = 10;
export const PAGING_DOT_CONTAINER_WIDTH = PAGING_DOT_WIDTH * 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: SCREEN_WIDTH,
    height: 350,
    marginTop: 100,
  },
  imageCarouselContainer: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  leftContent: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: TEXT_HEIGHT,
    height: TEXT_LENGTH,
  },
  leftText: {
    transform: [
      {rotate: '270deg'},
      {translateX: -OFFSET},
      {translateY: -OFFSET},
    ],
    width: TEXT_LENGTH,
    height: TEXT_HEIGHT,
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomContent: {
    width: SCREEN_WIDTH * 0.8,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  content: {
    color: 'gray',
  },
  pagingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 30,
    marginBottom: 20,
  },
  pageDotContainer: {
    width: PAGING_DOT_CONTAINER_WIDTH,
    height: PAGING_DOT_CONTAINER_WIDTH,
    borderRadius: PAGING_DOT_CONTAINER_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  page: {
    width: PAGING_DOT_WIDTH,
    height: PAGING_DOT_WIDTH,
    borderRadius: PAGING_DOT_WIDTH / 2,
  },
  tickerContainer: {
    position: 'absolute',
    top: 8,
    left: 16,
    height: TICKER_HEIGHT,
    overflow: 'hidden',
  },
  ticker: {
    fontSize: 26,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 2,
    lineHeight: TICKER_HEIGHT,
  },
  backgroundCircle: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_WIDTH * 0.7,
    opacity: 0.3,
    position: 'absolute',
    borderRadius: (SCREEN_WIDTH * 0.7) / 2,
  },
});

export default styles;
