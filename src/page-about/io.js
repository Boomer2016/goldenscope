import ioContext from '../common/io-context'

ioContext.create('home', {
  getContent: {
    mock: true,
    mockUrl: 'page-home/getContent',
    url: '',
  },
})

export default ioContext.api.home
