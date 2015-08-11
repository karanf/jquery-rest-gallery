var Templates = Templates || {};

Templates.thumbs = [
	'<div class="thumbs clearfix">',
        '{{#each images}}',
            '<img src="{{medium}}" alt="{{caption}}">',
        '{{/each}}',  
    '</div>'
].join('\n');

Templates.overlay = [
	'<div class="overlay">',
            '<div class="image-container clearfix">',
                '<figure></figure>',
                '<div class="close-btn fa fa-close"></div>',
                '<div class="next-btn fa fa-arrow-right"></div>',
                '<div class="prev-btn fa fa-arrow-left"></div>',
            '</div>',
        '</div>'
].join('\n');

Templates.image = [
	'<img src="{{image}}" alt="{{caption}}">',
    '<figcaption>{{caption}}</figcaption>'
].join('\n');

var compileTemplates = function(){
	for(template in Templates){
		Templates[template] = Handlebars.compile(Templates[template]);
	}
};

compileTemplates();