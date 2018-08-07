 // 指定 dom
var sendData = document.querySelector('.btn');
var bmiText = document.querySelector('.bmi-text');
var bmiIcon = document.querySelector('.bmi-icon');
var strtext = document.querySelector('.str-text');
var list = document.querySelector('.bmi-list');
var data = JSON.parse(localStorage.getItem('listData')) || [];
  // 監聽與更新
sendData.addEventListener('click',addData,false);
list.addEventListener('click',toggleDone,false);
bmiIcon.addEventListener('click',f5,false)
updateList(data);


  //加入列表，並同步更新網頁與 localstorage
function addData(e) {
  e.preventDefault();
  var cm = document.getElementById('cm').value;
  var kg = document.getElementById('kg').value;
  var bmis = kg/((cm/100)*(cm/100));
  var bmi  = bmis.toFixed(2);
  var str = '';

  if(bmi<18.5){
    str = '軽すぎ'
    sendData.setAttribute('id' , 'thin');
    strtext.setAttribute('id' , 'thin-text');
    bmiIcon.setAttribute('id' , 'thin-icon');
    sendData.setAttribute('disabled' ,'disabled');
    document.querySelector('.bmi').textContent = bmi;
    document.querySelector('.bmi-text').textContent = 'BMI'
    document.querySelector('.str-text').textContent = str;
  }
  if(bmi >= 18.5 && bmi <= 24){
    str = '正常'
    sendData.setAttribute('id' , 'normal');
    strtext.setAttribute('id' , 'normal-text');
    bmiIcon.setAttribute('id' , 'normal-icon');
    sendData.setAttribute('disabled' ,'disabled');
    document.querySelector('.bmi').textContent = bmi;
    document.querySelector('.bmi-text').textContent = 'BMI'
    document.querySelector('.str-text').textContent = str;
  }
  if(bmi > 24 && bmi <= 27){
    str = 'ぽっちゃり'
    sendData.setAttribute('id' , 'fat');
    strtext.setAttribute('id' , 'fat-text');
    bmiIcon.setAttribute('id' , 'fat-icon');
    sendData.setAttribute('disabled' ,'disabled');
    document.querySelector('.bmi').textContent = bmi;
    document.querySelector('.bmi-text').textContent = 'BMI'
    document.querySelector('.str-text').textContent = str;
    
  }
  if(bmi > 27 && bmi <= 30){
    str = '太っている'
    sendData.setAttribute('id' , 'toofat');
    strtext.setAttribute('id' , 'toofat-text');
    bmiIcon.setAttribute('id' , 'toofat-icon');
    sendData.setAttribute('disabled' ,'disabled');
    document.querySelector('.bmi').textContent = bmi;
    document.querySelector('.bmi-text').textContent = 'BMI'
    document.querySelector('.str-text').textContent = str;
  }
  if(bmi>30 && bmi<35){
    str = 'デブ'
    sendData.setAttribute('id' , 'superfat');
    strtext.setAttribute('id' , 'superfat-text');
    bmiIcon.setAttribute('id' , 'superfat-icon');
    sendData.setAttribute('disabled' ,'disabled');
    document.querySelector('.bmi').textContent = bmi;
    document.querySelector('.bmi-text').textContent = 'BMI'
    document.querySelector('.str-text').textContent = str;
  }
  if(bmi>35){
    str = 'くそデブ'
    sendData.setAttribute('id' , 'danger');
    strtext.setAttribute('id' , 'danger-text');
    bmiIcon.setAttribute('id' , 'danger-icon');
    sendData.setAttribute('disabled' ,'disabled');
    document.querySelector('.bmi').textContent = bmi;
    document.querySelector('.bmi-text').textContent = 'BMI'
    document.querySelector('.str-text').textContent = str;
  }
  var d = new Date();
  var day = d.getDate();
  var month = d.getMonth() + 1;
  var year = d.getFullYear();
  var today = year + "/" + month + "/" + day;

  var todo = {
    height : cm,
    weight : kg,
    bmi    : bmi,
    status : str,
    day : today,
  };

  if (cm == '' || kg == '' || bmi<1 || bmi >= 100 ){
      alert('請輸入正確數字');
  }else if (isNaN(cm)==true||isNaN(kg)==true){
      alert('您輸入非數字資料');
  }else{
    data.push(todo);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
  }
}

  // 更新網頁內容
  function updateList(data) {
    contentStr = '';
    var len = data.length;
    for (var i = 0; i < len; i++) 
    {
        contentStr += '<li id='+ borderLiftColor(data[i]) + '>';
        contentStr += '<span class="spanText">' + data[i].status + '</span>';
        contentStr += '<span> <span>BMI</span> ' + data[i].bmi + '</span>';
        contentStr += '<span> <span>身長</span> ' + data[i].height + ' cm </span>';
        contentStr += '<span class="kgText"> <span>体重</span> ' + data[i].weight + ' kg </span>';
        contentStr += '<span class="timeText"> <span>日付</span> ' + data[i].day + '</span>';
        contentStr += '<a href="#" data-index=' + i + ' />X</a>';
        contentStr += '</li>';
    }
    list.innerHTML = contentStr;
  }
  // 刪除代辦事項
  function toggleDone(e) {
    e.preventDefault();
    if(e.target.nodeName !== 'A'){return};
    var index = e.target.dataset.index;
    data.splice(index, 1);
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
  }

// 邊框顏色

  function borderLiftColor(data) {
  if(data.bmi < 18.5){
    return 'thin-border';
  }
  if(data.bmi >= 18.5 && data.bmi <= 24){
    return 'normal-border';
  }
  if(data.bmi > 24 && data.bmi <= 27){
    return 'fat-border';
    
  }
  if(data.bmi > 27 && data.bmi <= 30){
    return 'toofat-border';
  }
  if(data.bmi>30 && data.bmi<35){
    return 'superfat-border';
  }
  if(data.bmi>35){
    return 'danger-border';
  }
}

function f5(){
  window.location.reload();
}