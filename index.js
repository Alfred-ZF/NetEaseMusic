$.get('/songs.json').then(function (response) {
  //response可能是字符串，只是这里 response 的 content-type 是 json
  let items = response
  items.forEach((i) => {
    let $li = `
    <li>
      <a class="playcircled" href="./song.html?id=${i.id}">
        <h3>${i.name}</h3>
        <p>
          <svg class="SQ">
            <use xlink:href="#icon-youzhi"></use>
          </svg>演唱者-专辑
        </p>
        <svg class="icon-playcircled">
          <use xlink:href="#icon-playcircled"></use>
        </svg>
      </a>
    </li>
    `

    $('#latestMuisc').append($li)
  });
  $('#lastestMusic-loading').remove()

}, function () {
  console.log('失败了');

})