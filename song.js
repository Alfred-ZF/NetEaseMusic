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
  let audio = document.createElement('audio')
  audio.src = 'https://m801.music.126.net/20190328125636/41b2c1c7a66d3cba3a5874b1532bd3a5/jdyyaac/515c/0e08/0f5c/f66a8049539b36e25bb9861af5109f52.m4a'
  audio.setAttribute('muted', 'muted')
  audio.oncanplay = function () {
    $('.disc-container').addClass('playing')
    audio.play()  
    
  }
  $('.icon-pause').on('click',()=>{
    audio.pause()
    $('.disc-container').removeClass('playing')
  })

  $('.icon-play').on('click',()=>{
    audio.play()
    $('.disc-container').addClass('playing')
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