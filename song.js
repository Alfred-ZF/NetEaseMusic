$(function () {

  let id = location.search.match(/\bid=([^&]*)/)[1]



  $.get('/songs.json').then(function (response) {
    let songs = response
    let songId = songs.filter((s) => {
      return s.id == id
    })[0]
    let {
      url,
      name,
      lyric
    } = songId
    initPlayer.call(null, url)
    initLyric.call(null, name, lyric)

    parseLyric.call(null, lyric)
  })


  //   $.get('/lyric.json').then(function (object) {
  //     let {
  //       lyric
  //     } = object

  // })

  function initLyric(name, lyric) {
    $('.song-description h1').text(name)
    parseLyric.call(null, lyric)
  }

  function parseLyric(lyric) {
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


  }

  function initPlayer(url) {
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
    setInterval(() => {
      let seconds = audio.currentTime
      let minutes = ~~(seconds / 60)
      let left = seconds - (minutes * 60)
      let time = `${pad(minutes)}:${pad(left)}`
      // console.log(time);
      let $whichLine
      let $line = $('.line > p')

      for (let i = 0; i < $line.length; i++) {
        
        if ($line.eq(i).attr('data-time') < time && $line.eq(i+1).attr('data-time') > time && $line.eq(i+1).length !== 0) {
          $whichLine = $line.eq(i)
          break
        }
      }
      if ($whichLine) {
        $whichLine.addClass('active').prev().removeClass('active')
        let $whichLineTop = $whichLine.offset().top
        let $lineTop = $('.line').offset().top
        let delta = $whichLineTop - $lineTop - $('.lyric').height()/3
        $('.line').css('transform', `translateY(-${delta}px)`)
      }
    }, 300)
  }

  function pad(number) {
    return number>=10 ? number + '' : '0' + number
  }
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