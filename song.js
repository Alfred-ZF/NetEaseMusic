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
  audio.src = '//pp2cjxdfh.bkt.clouddn.com/045b_010c_010f_31f6c268ce6f86bb16ad6e7b2cf761c8.m4a'
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