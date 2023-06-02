<template>
    <div id="map"></div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex';
import mapboxgl from 'mapbox-gl'


export default {
    mounted() {
        this.fetchMarkersData();
    },
    computed: {
        ...mapGetters(['markersData'])
    },
    methods: {
        ...mapActions(['fetchMarkersData']),
        initializeMap() {
            mapboxgl.accessToken = 'pk.eyJ1IjoibWlraGFpbGRsZyIsImEiOiJjbGljNjZwMncwNGtqM3FvYnUzaWZ0ejdlIn0.T6kR8JPkvKqtBIPG2tcXDg';

            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [73.4004755976151, 61.2528475977909],
                zoom: 12
            });
            this.addMarkers(map);
            map.addControl(new mapboxgl.FullscreenControl());
            map.addControl(new mapboxgl.NavigationControl());

        },
        addMarkers(map) {
            this.markersData.forEach(markerData => {
                const coordinates = markerData.geom.coordinates;
                const name = markerData.name;
                const status = markerData.status
                const el = document.createElement('div');
                el.style.backgroundColor = (status === 3) ? "green" : (status === 255) ? "gray" : (status === 1) ? "red" : "white";
                el.style.width = '25px'
                el.style.height = '25px'
                el.style.borderRadius = '50%'
                el.style.cursor = 'pointer'
                const marker = new mapboxgl.Marker(el)
                    .setLngLat(coordinates)
                    .setPopup(new mapboxgl.Popup().setHTML(name))
                    .addTo(map);
            });
        }
    },
    watch: {
        markersData() {
            this.initializeMap();
        }
    }
};
</script>
  
<style>
#map {
    height: 800px;
    border: 5px solid gray;

}
</style>