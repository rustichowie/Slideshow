



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
    this.runPage(0);
  },
  runPage: function(pageId){
    var slideshow = this;
    var pageData = slideshow.data[pageId];
    var pageNode =  document.querySelector('#slideshow');
    var contentNode = document.createElement("DIV");                 // Create a <li> node

    contentNode.classList.add("page");
    pageNode.appendChild(contentNode);
    setTimeout(function(){
      setTimeout(function(){ //TEXT
        var content = pageData.content;
        var textContainerNode = document.createElement("DIV");
        textContainerNode.classList.add("page_content");
        contentNode.appendChild(textContainerNode);
        for (var i = 0; i < content.length; i++) {
          slideshow.arrangeText(content[i], textContainerNode);
        }

      }, 0);
      setTimeout(function(){ //IMAGES
        var content = pageData.content;
        var imageContainer = document.createElement("DIV");
        imageContainer.classList.add("page_images");
        contentNode.appendChild(imageContainer);

        for (var i = 0; i < pageData.images.length; i++) {
          slideshow.animateImage(pageData.images[i], imageContainer);
        }
      }, 0);

      setTimeout(function(){ //END PAGE
        if((pageId + 1) < slideshow.data.length){
          slideshow.endPage(pageData, pageId);

        }

      }, pageData.options.pageTime);

    }, pageData.options.startDelay);

  },
  animateImage: function(imageData, imageContainer){
    var img = document.createElement("IMG");
    img.src = imageData.url;
    setTimeout(function(){
      img.classList.add("animated");
      img.style.height = imageData.height + "px";
      if(imageData.classes){
        for (var i = 0; i < imageData.classes.split(",").length; i++) {
          var className = imageData.classes.split(",")[i];
          img.classList.add(className);
        }
      } else {
        img.classList.add("fadeIn");
      }

      imageContainer.appendChild(img);
    }, imageData.delay);

  },
  endPage: function(data, id){
    var page = document.querySelector('.page');
    var slideShow = this;
    if(data.options.endAnimation){
      page.classList.add("animated", data.options.endAnimation);
    } else {
      page.classList.add("animated", "fadeOut");
    }
    setTimeout(function(){
      page.remove();
      slideShow.runPage(id+1);
    }, data.options.endDelay);
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


        slideshow.showText(textNode, currentText, currentText.text);
      } else {
        //TODO: add css animations
        var text = document.createTextNode(localCurrentText.text);
        textNode.classList.add(localCurrentText.animation, "page_text", "page_text--show");
        textNode.appendChild(text);
      }

    }, currentText.delay);

  },
  showText: function(node, currentText, text){

    switch (currentText.animation) {
      case "writing":
        this.writeText(text, node, currentText.writeSpeed);
        break;
      default:
        break;
    }
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
