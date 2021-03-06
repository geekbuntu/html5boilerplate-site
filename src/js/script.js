if (!/^en/.test(navigator.language)){
  document.body.className += ' notenglish';
}

SyntaxHighlighter.config.tagName = 'code';
SyntaxHighlighter.defaults['wrap-lines'] = true; // maybe change this
SyntaxHighlighter.defaults['auto-links'] = false;
SyntaxHighlighter.defaults['toolbar'] = false;
SyntaxHighlighter.defaults['tab-size'] = 4;

// smooth scrolling to in-page anchors.
$.fn.smoothScrollTo = function(){
  return this.live('click', function (e) {
    var elm = $(this).attr('href');
    if(!$(elm).is(':visible')) {
      $('a[href=#dsq-content]').trigger('click');
    }
    $('html,body').animate({'scrollTop': $(elm).offset().top-40+'px'}); // 40px buffer to top.
    e.preventDefault();
  });
};


var dsqshow, loadcomments = function() {
  if(!dsqshow){
    dsqshow = true;
    loaddisqus();
  }  
  jQuery('#disqus_thread').show();    
}, loaddisqus = function() {
    var disqus_developer = ( /file/.test(location.protocol) || /(localhost|dropbox)/.test(location.host) ) ? undefined : 1;
    var disqus_category_id = 517513;
    var disqus_url = '{% blocktrans %}http://html5boilerplate.com/{% endblocktrans %}';

    setTimeout(function() {
     var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
     dsq.src = 'http://boilerplate.disqus.com/embed.js';
     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    }, 10);  
};


$(document).ready(function(){   
     
  $('pre[class]').each(function(i, el) {
    SyntaxHighlighter.highlight(undefined, el);
  });
  $('div.source code.comments').each(function(){
    $(this).html(  linkify( this.innerHTML ) );
  });
  
  $('.source h4 a').toggle(
    function(e) {
      $(this).addClass('active');
      $(this).parent().next().show('slow');
      e.preventDefault();
    },
    function(e) {
      $(this).removeClass('active');
      $(this).parent().next().hide('slow');
      e.preventDefault();
    }        
  );
 
  var videolinks = $('.videos a[href^="#video-"]');
  videolinks.bind('click', function(e) {
    videolinks.removeClass('active');
    $(this).addClass('active');
    var activevideo = $(/#(.*)/g.exec(this.href)[0]);
    $('.videos .video-active').removeClass('video-active');
    activevideo.addClass('video-active');
    e.preventDefault();
  });  
  
  jQuery('a[href=#disqus_thread]').smoothScrollTo();

  jQuery('a[href=#dsq-content]').toggle(
    function () {
      jQuery(this).text('{% blocktrans %}Hide Comments{% blocktrans %}');
      loadcomments();
    },
    function () {
      jQuery(this).text('{% blocktrans with "400+" as num_comments %}Show comments{% endblocktrans %}');
      jQuery('#disqus_thread').hide();
    }
  );
  
  // !~$.inArray(hash, $('.update').map(function(){ return this.id }).get()) 
  if (~location.hash.replace('#','').indexOf('comment')){
    loadcomments();
    jQuery('a[href=#dsq-content]').click();
  }
    
  // lazy inject the videos
  setTimeout(function(){
    $('noscript').each(function(){
      var html = $.trim( $(this).text() ) || $.trim( $(this).attr('data-html') )
      $(html).insertBefore(this);
    });
  }, 3000);

  $('#intro').prevAll('a').first().click(function(){
    $('#header').toggleClass('showintro');
    return false;
  });


}); // end of doc ready()


// google analytics
var _gaq=[['_setAccount','UA-17904194-1'],['_trackPageview']];
(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
s.parentNode.insertBefore(g,s)}(document,'script'));

$(function(){
	var parameters = {}, builder = $('#builder'), downloadelm = $('#builder-download'), downloadurl = downloadelm.attr('href');
	$('#builder-custom').toggle(function(e) {
	  builder.css({ opacity: 0 }).show().animate({ opacity: 1}, 1000);
    e.preventDefault();
	}, function(e) { builder.animate({ opacity: 0 }, 1000, function() { builder.hide('slow'); }); e.preventDefault(); });
	
	$("#builder > div > a").click(function(e){
	  var that = $(this); 
	  var option = that.parent();
		option.find("a").removeClass("selected");
		var choice = that[0].id;
    if(choice) {
		    that.addClass("selected");
		    parameters[option[0].id] = /^default\-/g.exec(choice) ? '' : choice;
      }		  
      e.preventDefault();
	});
	
	downloadelm.click(function() { 
	  var params = '';
	  var trackparams = '';
    $.each(parameters, function(key, value) { if(value) { params += value + '&'; } });
		if (params != '') {trackparams = '&'+params;}
		_gaq.push(['_trackPageview', '/build/'+trackparams.substr(0, trackparams.length-1)]);
		this.href =  downloadurl + params.substr(0, params.length-1);
	});	
});
