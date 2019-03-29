$(function () {

  let id = location.search.match(/\bid=([^&]*)/)[1]



  $.get('/songs.json').then(function (response) {
    let songs = response
    let songId = songs.filter((s) => {
      return s.id == id
    })[0]
    let {
      url
    } = songId
    console.log(url);
    let audio = document.createElement('audio')
    audio.src = url
    audio.setAttribute('muted', 'muted')
    audio.oncanplay = function () {
      $('.disc-container').addClass('playing')
      audio.play()

    }
    $('.icon-pause').on('touchstart', () => {
      audio.pause()
      $('.disc-container').removeClass('playing')
    })

    $('.icon-play').on('touchstart', () => {
      audio.play()
      $('.disc-container').addClass('playing')
    })


  })

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




// function event(element,eventType, selector, fn) {
//   element.addEventListener(eventType, (e)=>{
//     let el = e.target
//     while (!el.matches(selector)) {
//       if (element === el) {
//         el = null
//         break
//       }
//       el = el.parentNode
//     }
//     el && fn.call(el,e,el)
//   })
//   return element
// }