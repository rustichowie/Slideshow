



var Slideshow = {
  overlay: document.querySelector('.overlay'),
  node: document.querySelector('#slideshow'),
  startBtn: document.querySelector('.js-start'),
  data: Data,
  jsAnimations: ["writing"],
  start: function(){
    this.overlay.classList.toggle('overlay--start');
    this.startBtn.classList.toggle('hide');
    this.data = this.data || Data;
    var slideshow = this;
    setTimeout(function(){
      slideshow.writeText("Kjære Stine!", document.querySelector('.title'), 200);

    }, 1000);
    this.runPage(0);
  },
  runPage: function(pageId){
    var slideshow = this;
    var pageData = slideshow.data[pageId];
    var pageNode =  document.querySelector('#slideshow');
    var contentNode = document.createElement("DIV");                 // Create a <li> node

    contentNode.classList.add("page");
    pageNode.appendChild(contentNode);
    /*setTimeout(function(){
      var titleNode = document.createElement(pageData.options.titleTag);
      if(slideshow.jsAnimations.indexOf(pageData.options.titleAnimation) !== -1){


        for (var i = 0; i < pageData.options.titleClasses.split(",").length; i++) {
          var className = pageData.options.titleClasses.split(",")[i];
          titleNode.classList.add(className);
        }
        titleNode.classList.add("page_title", "page_title--show");
        contentNode.appendChild(titleNode);

        slideshow.showText(titleNode, pageData.options.titleAnimation, pageData.title);
      } else {
        //TODO: add css animations
      }
    }, pageData.options.titleDelay);*/

    setTimeout(function(){
      var content = pageData.content;
      var textContainerNode = document.createElement("DIV");
      textContainerNode.classList.add("page_content");
      contentNode.appendChild(textContainerNode);
      for (var i = 0; i < content.length; i++) {
        slideshow.arrangeText(content[i], textContainerNode);
      }

    }, pageData.options.textDelay);
    setTimeout(function(){

    }, pageData.options.imagesDelay);

    setTimeout(function(){
      if((pageId + 1) < slideshow.data.length){
        slideshow.endPage(pageData, pageId);

      }

    }, pageData.options.pageTime);

  },
  endPage: function(data, id){
    var page = document.querySelector('.page');
    var slideShow = this;
    if(data.endAnimation){
      page.classList.add("animated", data.endAnimation);
    } else {
      page.classList.add("animated", "fadeOut");
    }
    setTimeout(function(){
      page.remove();
      slideShow.runPage(id+1);
    }, 1000);
  },
  arrangeText: function(content, textContainerNode){
    var slideshow = this;
    var currentText = content;
    setTimeout(function(){
      var localCurrentText = currentText;
      var textNode = document.createElement("SPAN");
      textContainerNode.appendChild(textNode);

      for (var i = 0; i < localCurrentText.classes.split(",").length; i++) {
        var className = localCurrentText.classes.split(",")[i];
        textNode.classList.add(className);
      }


      if(slideshow.jsAnimations.indexOf(localCurrentText.animation) !== -1){

        textNode.classList.add("page_text", "page_text--show");


        slideshow.showText(textNode, currentText.animation, currentText.text);
      } else {
        //TODO: add css animations
        var text = document.createTextNode(localCurrentText.text);
        textNode.classList.add(localCurrentText.animation, "page_text", "page_text--show");
        textNode.appendChild(text);
      }

    }, currentText.delay);

  },
  showText: function(node, animation, text){

    switch (animation) {
      case "writing":
        this.writeText(text, node, 100);
        break;
      default:
        break;
    }
  },
  generateHtml: function(node, data){

    var titleContent = document.createTextNode(data.title);
    titleNode.appendChild(titleContent);



    contentNode.appendChild(titleNode);
    return contentNode;
  },
  init: function(){
    if(!this.data){
      this.data = Data;
    }
    this.startBtn.addEventListener('click', function(){
      this.start();
    }.bind(this))
  },
  writeText: function(text, textContainer, speed){
    speed = speed || 100;
    var count = 0;
    var max = text.length;
    var writingLoop = setInterval(function(){
      if(count >= max){
        clearInterval(writingLoop);
      } else {
        var node = document.createElement("SPAN");                 // Create a <li> node
        var textnode = document.createTextNode(text.charAt(count));
        node.appendChild(textnode);
        textContainer.appendChild(node);

      }
      count++;
    }, 100);
  }
}
  Slideshow.init();
