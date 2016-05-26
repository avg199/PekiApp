myApp.onPageInit('map-screen', function (page) {

    $$('#map').on('show', function () {
        // when tab shows, resize map and center all points
        google.maps.event.trigger(map, "resize");
        map.fitBounds(bounds);
        map.setZoom(15)
    });
});