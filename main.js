// <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
// <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script> 
// <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
// <script src="https://cdn.finsweet.com/files/cmslibrary-v1.8.js"></script>
// <script src="https://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize&key=AIzaSyDmS2jKAfcCx0sKapBe4jOuft7BjqYqKco" async defer></script>
// <script>
  var filterByTextElements = document.querySelectorAll('.filter-by-destination');
  for (element of filterByTextElements) {
      var elementText = element.innerText;
      element.parentElement.setAttribute('filter-by', elementText);
   }
   
var map, mapElem, markerImg, infoWindow, marker
var markers = [], infoWindows = []
var mapOptions = {
  mapTypeId: 'roadmap',
}

let cards = document.querySelector('.cards-grid-container').children

function initialize () {
  markerImg = {
    url:'https://uploads-ssl.webflow.com/5fe9ffe033bab99a19322566/6119672b75eb54a2775810fc_607d4ef7b04e030b63d70b28_Group%201333%201.svg',
    size: new google.maps.Size(60, 70),
    anchor: new google.maps.Point(10, 15),
  }

  mapElem = document.getElementById('map_canvas')
  map = new google.maps.Map(mapElem, mapOptions)
  map.setTilt(45)

    for(i = 0; i < cars.length; i++) {
      var car = cars[i]
      var infoWindow = new google.maps.InfoWindow();
      infoWindow.setContent(
      '<a class="vertical no-text-decoration" href="'+car.url+'"><div class="photo-map-marker" style="background:url('+car.photo+') center/cover no-repeat"></div><div class="vertical"><h6 class="main-header price small-margin-bottom">'+car.pricehr+'€'+'</h6></div></a>'
      )
      infoWindows.push(infoWindow)
      if(cards[i].style.display != "none") {
        createMarker(car.lat, car.lng, i)
      }
    }
  fitToMarkers()
  }
  
let filtersButton = document.querySelectorAll('.sort-btn')

filtersButton.forEach(element => {
  element.addEventListener('click', () => {
    initialize()
  })
})

function createMarker(x, y, i) {
  marker = new google.maps.Marker({
    map: map,
    icon: markerImg,
    position: new google.maps.LatLng(x,y),
    title: cars[i].name,
  })
  marker._index = i;
  markers.push(marker);

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      if(infoWindow) infoWindow.close();
      infoWindow = infoWindows[i];
      infoWindow.open(map, marker);
    }
  })(marker, i))
}

function mapResize() {
  google.maps.event.trigger(map, "resize");
  fitToMarkers()
}

function fitToMarkers() {
  map.setZoom(15)
  var bounds = new google.maps.LatLngBounds()
  for(var i = 0; i < markers.length; i++) {
   bounds.extend(markers[i].getPosition())
  }
  map.fitBounds(bounds)
  map.setZoom(14)
  map.setOptions({maxZoom: 14})
}
Webflow.push(function() {
  $(window).resize(function() {
    if($(window).width() < 768) return
    if(typeof mapResize === 'function') mapResize()
  })
})

$('#dates').attr('readonly','readonly');
(function() {
	var projectsGrid = new FsLibrary('.collection-list')
	var myFilters = [
{
filterWrapper: ".filter-highlights",
filterType: "multi"
},
{
filterWrapper: ".filters-prices",
filterType: "exclusive",
filterByClass :".price-range",
filterRange : true
}, 
{
filterWrapper: ".search-parent",
ilterType: "exclusive"
},
{
filterWrapper: ".filters-services",
filterType: "multi"
},
{
      filterWrapper: ".filters-guest-range",
      filterByClass :".guest-range",
      filterType: "exclusive",
      filterRange : true

},
{
filterWrapper: ".filters-destinations",
filterType: "multi"
},
{
filterWrapper: ".filters-cms",
filterType: "exclusive"
},
{
filterWrapper: ".filters-bathrooms",
filterType: "multi"
},
{
filterWrapper: ".filter-dates",
filterType: "multi"
},
{
filterWrapper: ".filters-dates-range",
filterType: "exclusive"
},
{
filterWrapper: ".filters-bedrooms",
filterType: "multi"
}
]

projectsGrid.filter({
	filterArray: myFilters,
  activeClass: 'fltr-active',
  filterReset: '.reset-all-master',
	animation: {
	 enable: true,
	 duration: 200,
	 easing: 'ease-out',
	 effects: 'fade translate(0px,20px)'
	}
})
projectsGrid.sort({
	sortTrigger: '.sort-button-reverse',
	sortReverse: false,
  activeClass: 'fltr-active',
  animation: {
   enable: true,
   duration: 200,
   easing: 'ease-out',
 	 effects: 'fade translate(0px,20px)'
  }
})
projectsGrid.sort({
 sortTrigger: '.sort-button',
 sortReverse: true,
 activeClass: 'fltr-active',
 animation: {
  enable: true,
  duration: 200,
  easing: 'ease-out',
  effects: 'fade translate(0px,20px)'
  }
 })
})()

const sortButton = document.querySelector('.sort-button')
const sortButtonReverse = document.querySelector('.sort-button-reverse')
let onClickFunction = (btn, theOther) => {
  btn.addEventListener('click', () => {
    btn.disabled === false
    theOther.classList.remove('fltr-active')
    theOther.disabled === true
  })
}
onClickFunction(sortButton, sortButtonReverse)
onClickFunction(sortButtonReverse, sortButton)

var auto_dates, dateArray, start_name, end_name
$('#wf-form-date-search').submit(function() {
  return false
})

	Date.prototype.addDays = function(days) {
       var dat = new Date(this.valueOf())
       dat.setDate(dat.getDate() + days)
       return dat;
  }

  function getDates(startDate, stopDate) {
      var dateArray = new Array();
      var currentDate = startDate.addDays(1);
      while (currentDate <= stopDate.addDays(1)) {
        dateArray.push(currentDate.toISOString().slice(0, 10))
        currentDate = currentDate.addDays(1);
      }
      return dateArray;
    }

$('#dates').daterangepicker({
"locale": {
        "format": "YYYY-MM-DD",
        "separator": " - ",
        "applyLabel": "Apply",
        "cancelLabel": "Cancel",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "weekLabel": "W",
        "daysOfWeek": [
            "Su","Mo","Tu","We","Th","Fr","Sa"
        ],
        "monthNames": [
            "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
        ],
        "firstDay": 1
    },
    "showWeekNumbers": true,
    "autoApply": false,
    "applyButtonClasses": "cta",
    "drops": "auto"
}, 
function(start, end, label) {
  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
  var start_name = start.format('YYYY-MM-DD');
	var end_name = end.format('YYYY-MM-DD');
	var dateArray = getDates((new Date('"'+start_name+'"')), (new Date('"'+end_name+'"')));
	var date_avail= dateArray.toString()
	document.getElementById("fake-date").value = date_avail
	document.getElementById("fake-date").dispatchEvent(new Event('input', {
  view: window,
  bubbles: true,
  cancelable: true
}))

})
var nextweek = new Date()
var numberOfDaysToAdd = 6
nextweek.setDate(nextweek.getDate() + numberOfDaysToAdd)
var afternextweek = new Date()
var numberOfDaysToAdd2 = 13
afternextweek.setDate(afternextweek.getDate() + numberOfDaysToAdd2)

let nextWeekChanged = new Date(nextweek).toLocaleDateString('fr-CA')
let afterNextWeekChanged = new Date(afternextweek).toLocaleDateString('fr-CA')

if(window.location.search){
 const urlParams = new URLSearchParams(window.location.search)
 var date_to_be_decoded = urlParams.get('dates')
 var date_decoded = decodeURIComponent(date_to_be_decoded)

if(date_to_be_decoded == 'undefined') {
	date_decoded = nextWeekChanged + " - " + afterNextWeekChanged
} else {
	date_decoded = decodeURIComponent(date_to_be_decoded)
}
  $('.auto-dates').text(urlParams.get('dates'))

	var destinationvar = urlParams.get('destination')
  var destinationvarcap = destinationvar.charAt(0).toUpperCase() + destinationvar.slice(1);
	$('.auto-destination').text(destinationvarcap);

let desti = document.querySelector('div.w-dyn-item[filter-by="'+destinationvarcap+'"]')
let linkDesti = desti.children[0]
linkDesti.classList.toggle('fltr-active')
desti.click()
} else {
	date_decoded = nextWeekChanged + " - " + afterNextWeekChanged
}
document.getElementById("dates").value = date_decoded;
  let iterations = 0
  let stringI = ""
  let premier = ""
  
  while (iterations < 10) {
  	let letterDecode = date_decoded.charAt(iterations)
    stringI += letterDecode
    	if(stringI.length <= 10){
        premier = stringI
        if(iterations > 15){
        	break
        }
      }
    iterations += 1
  }
  let secondIterations = 13
  let secondStringI = ""
  let second = ""
  while (secondIterations < 23) {
  	let secondLetterDecode = date_decoded.charAt(secondIterations)
    secondStringI += secondLetterDecode
    	if(secondStringI.length <= 10){
        second = secondStringI
        if(secondIterations > 30){
        	break
        }
      }
    secondIterations += 1
  }
 
	var dateArray = getDates((new Date('"'+premier+'"')), (new Date('"'+second+'"')))
	var date_avail= dateArray.toString()
	document.getElementById("fake-date").value = date_avail
	document.getElementById("fake-date").dispatchEvent(new Event('input', {
  view: window,
  bubbles: true,
  cancelable: true
}))

 $(".close-fltr").click(function(){
    $(".drop-down-filter").removeClass("w--open")
})
//</script>
