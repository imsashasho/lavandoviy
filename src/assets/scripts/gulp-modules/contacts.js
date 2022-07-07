async function func() {
    const script = document.createElement('script');
    let key = 'AIzaSyC5AXf3Yw3tgHbODRCUwOMHJRvpKOLmJ2Q';
    if (window.location.href.match(/localhost/)) key = '';
    // const key = '';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  // setTimeout(func, 1000);
  const maps = document.querySelectorAll('.map');
  const options = {
    rootMargin: '0px',
    threshold: 0.1,
  };
  
  maps.forEach((image) => {
    const callback = function (entries, observer) {
      /* Content excerpted, show below */
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          observer.unobserve(image);
          func();
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    const target = image;
    observer.observe(target);
  });
  
  // eslint-disable-next-line no-unused-vars
  async function initMap() {
    const gmarkers1 = [];
    const center = {
      lat: 50.47315200396692, lng: 30.517570821411027,
    };
      /** Массив, куда записываются выбраные категории */
    const choosedCategories = new Set();
    choosedCategories.add('main');
    /** Елементы, при клике на который будет происходить фильтрация */
    const filterItems = document.querySelectorAll('[data-marker]');
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: true,
      language: 'en',
      styles: [
        {
            "featureType": "road",
            "stylers": [
                {
                    "hue": "#5e00ff"
                },
                {
                    "saturation": -79
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "saturation": -78
                },
                {
                    "hue": "#6600ff"
                },
                {
                    "lightness": -47
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "lightness": 22
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "hue": "#6600ff"
                },
                {
                    "saturation": -11
                }
            ]
        },
        {},
        {},
        {
            "featureType": "water",
            "stylers": [
                {
                    "saturation": -65
                },
                {
                    "hue": "#1900ff"
                },
                {
                    "lightness": 8
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "weight": 1.3
                },
                {
                    "lightness": 30
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "hue": "#5e00ff"
                },
                {
                    "saturation": -16
                }
            ]
        },
        {
            "featureType": "transit.line",
            "stylers": [
                {
                    "saturation": -72
                }
            ]
        },
        {}
    ],
  
    });
    const filterMarkers = function (category, categoriesArray) {
      // console.log(categoriesArray);
      gmarkers1.forEach((el) => {
        console.log(el.category, categoriesArray.has(el.category), 'FILTER');
        if (categoriesArray.has(el.category) || categoriesArray.size <= 1) {
          el.setMap(map);
          el.setAnimation(google.maps.Animation.DROP);
        } else {
          el.setMap(null);
        }
      });
    };
    filterItems.forEach((item) => {
      // console.log(item);
      item.addEventListener('click', () => {
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
          choosedCategories.add(item.dataset.category);
        } else {
          choosedCategories.delete(item.dataset.category);
        }
        filterMarkers('main', choosedCategories);
      });
    });
  
    let baseFolder = '/wp-content/themes/lamanche/assets/images/map/';
    if (window.location.href.match(/localhost/)) baseFolder = './assets/images/map/';
    if (document.documentElement.dataset.base) baseFolder = document.documentElement.dataset.base+'/assets/images/map/';
    // const baseFolder = './assets/images/markers/';
    const defaultMarkerSize = new google.maps.Size(44, 60);
    const buildLogoSize = new google.maps.Size(245, 70);
    //'main', 'school', 'kinder', 'medicine', 'shop', 'cafe', 'leisure', 'sport'
    const markersAdresses = {
      main: `${baseFolder}marker-main.svg`,
      sale: `${baseFolder}marker-sale.svg`,
      school: `${baseFolder}marker-school.svg`,
      kinder: `${baseFolder}marker-kinder.svg`,
      medicine: `${baseFolder}marker-medicine.svg`,
      shop: `${baseFolder}marker-shop.svg`,
      cafe: `${baseFolder}marker-cafe.svg`,
      leisure: `${baseFolder}marker-leisure.svg`,
      sport: `${baseFolder}marker-sport.svg`,
    };
  
    // eslint-disable-next-line no-unused-vars
    const currentLang = (function () {
      const location = window.location.href;
      if (location.match(/\/en\//)) return 'en';
      if (location.match(/\/ru\//)) return 'ru';
      return 'ua';
    }());
    // eslint-disable-next-line no-unused-vars
    const markerPopupStyle = `
            style="
            background: #1798D5;
            padding:5px 10px;
            font-weight: 500;
            font-size: 14px;
            line-height: 22px;"
            `;
  
  
    /* beautify preserve:start */
    const markersData = [
      // {
      //   content: {
      //     ua: '<div>Офіс продажу</div>',
      //     ru: '<div>Офіс продажу</div>',
      //     en: '<div>Офіс продажу</div>',
      //   },
      //   position: { lat: 50.47315200396692, lng: 30.517570821411027 },
      //   type: 'main',
      //   icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
      // },
    ];


    const sData = new FormData();
    sData.append('action', 'infrastructure');
    if (document.documentElement.dataset.mode !== 'local') {
      let requestForMarkers = await fetch('/wp-admin/admin-ajax.php', {
        body: sData,
        method: 'POST'
      })
      requestForMarkers = await requestForMarkers.json();
      let markerIterator = 0;
      requestForMarkers.forEach((responseCategory, index) => {
        if (!responseCategory['list']) return;
        responseCategory['list'].forEach((resMarker, i) => {
          markersData.push({
            content: {
              ua: `<div>${resMarker['name']}</div>`,
              ru: `<div>${resMarker['name']}</div>`,
              en: `<div>${resMarker['name']}</div>`,
            },
            id: markerIterator,
            position: { lat: resMarker.coordinations.latitude, lng: resMarker.coordinations.elevation },
            type: responseCategory['code'],
            icon: { url: markersAdresses[responseCategory['code']], scaledSize: buildLogoSize },
          });
          markerIterator++;
        })
      })
      console.log(requestForMarkers);

    }
    const markersCategoriesList = new Set();
    markersData.forEach((el) => { markersCategoriesList.add(el.type); });
    // console.log(markersCategoriesList);
    /* beautify preserve:end */
    // eslint-disable-next-line no-unused-vars
    const infowindow = new google.maps.InfoWindow({
      content: '',
      maxWidth: 200,
    });
    let initedMarkers = [];
    markersData.forEach((marker, index) => {
      const category = marker.type;
      const mapMarker = new google.maps.Marker({
        map,
        category,
        icon: marker.icon,
        position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
      });
      if (index === 0) {
        map.setCenter(new google.maps.LatLng(marker.position.lat, marker.position.lng));
      }
  
      google.maps.event.addListener(mapMarker, 'click', function () {
        infowindow.setContent(marker.content[currentLang]);
        infowindow.open(map, mapMarker);
        map.panTo(this.getPosition());
      });
      mapMarker.name = marker.type;
      gmarkers1.push(mapMarker);
    });

    window.addEventListener('click',function(evt){
      if (evt.target.closest('[data-marker-id]') === null) return;
      const clickedId = evt.target.closest('[data-marker-id]').dataset.markerId;
      const markerPosition = gmarkers1[clickedId].getPosition();
      map.panTo(markerPosition);
      infowindow.setContent(markersData[clickedId].content[currentLang]);
      infowindow.open(map, gmarkers1[clickedId]);
    });
  }
  