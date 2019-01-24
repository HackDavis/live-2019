import Parse from 'parse'

Parse.initialize('hackdavis2019')
Parse.serverURL = 'https://hackdavisapp.herokuapp.com/parse'

export default ({ app }, inject) => {
  inject('Parse', Parse)
}
