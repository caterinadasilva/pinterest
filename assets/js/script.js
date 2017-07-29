$(document).ready(function() {
  var $grid = $('.grid').masonry({
  itemSelector: '.photo-item',
  columnWidth: '.grid__col-sizer',
  gutter: '.grid__gutter-sizer',
  percentPosition: true,
  stagger: 30,
  // nicer reveal transition
  visibleStyle: { transform: 'translateY(0)', opacity: 1 },
  hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
});

//------------------//

// Get an API key for your demos at https://unsplash.com/developers
var unsplashID = '9ad80b14098bcead9c7de952435e937cc3723ae61084ba8e729adb642daf0251';

// get Masonry instance
var msnry = $grid.data('masonry');

$grid.infiniteScroll({
  // use path string with {{#}} for page number
  path: 'https://api.unsplash.com/photos?page={{#}}&client_id=' + unsplashID,
  // load response as flat text
  responseType: 'text',
  outlayer: msnry,
  status: '.page-load-status',
  history: false,
});

$grid.on( 'load.infiniteScroll', function( event, response ) {
  console.log( response )
  // parse response into JSON data
  var data = JSON.parse( response );
  // compile data into HTML
  var itemsHTML = data.map( getItemHTML ).join('');
  // convert HTML string into elements
  var $items = $( itemsHTML );
  // append item elements
  $items.imagesLoaded( function() {
    $grid.infiniteScroll( 'appendItems', $items )
      .masonry( 'appended', $items );
  })
});

// load initial page
$grid.infiniteScroll('loadNextPage');

//------------------//

var itemTemplateSrc = $('#photo-item-template').html();

function getItemHTML( photo ) {
  return microTemplate( itemTemplateSrc, photo );
}

// micro templating, sort-of
function microTemplate( src, data ) {
  // replace {{tags}} in source
  return src.replace( /\{\{([\w\-_\.]+)\}\}/gi, function( match, key ) {
    // walk through objects to get value
    var value = data;
    key.split('.').forEach( function( part ) {
      value = value[ part ];
    });
    return value;
  });
}
});