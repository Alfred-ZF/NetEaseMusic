$(function () {
  $.get('/lyric.json').then(function (object) {
    let {
      lyric
    } = object
    let array = lyric.split('\n')
    let regex = /^\[(.+)\](.*)$/
    array = array.map(function (string) {
      let matches = string.match(regex)
      if (matches) {
        return {
          time: matches[1],
          words: matches[2]
        }
      }
    })
    let $lyric = $('.lyric')
    array.map(function (object) {
      if (!object) {
        return
      }
      let $p = $('<p/>')
      $p.attr('data-time', object.time).text(object.words)
      $p.appendTo($lyric.children('.line'))
    })

  })

  
})

let audio = document.createElement('audio')
  audio.src = 'https://m801.music.126.net/20190327211539/3693e604399695549598332cece89ff7/jdyyaac/515b/515d/0559/f19166cfc6f769999f21239b1baa67de.m4a'
  audio.setAttribute('muted', 'muted')
  audio.oncanplay = function () {
    audio.play()
    // console.log(1);
    
    // setTimeout(function(){audio.play.bind(audio)},0);
    // console.log(2);
    
    $('.disc-container').addClass('playing')
  }