<template>
    <div class="container">
        <div class="selects">
            <my-select label="Сортировка по ID:" v-model="sortByID" :options="sortOptions"></my-select>
            <my-select label="Сортировка по имени:" v-model="sortByName" :options="sortOptions"></my-select>
            <my-select label="Фильтр по статусу:" v-model="filterByStatus" :options="statusOptions"></my-select>
            <my-select label="Фильтр по интегратору:" v-model="filterByIntegrator" :options="integratorOptions"></my-select>
        </div>
        <div class="items" v-for="marker in filteredMarkers" :key="marker.id">
            <div class="item-id">{{ marker.id }}</div>
            <div class="item-name">{{ marker.name }}</div>
            <div class="item-status">{{ marker.status }}</div>
            <div class="item-integrator">{{ marker.integrator }}</div>
        </div>
    </div>
</template>
  
<script>
import MySelect from '../components/MySelect'

export default {
    components: { MySelect },
    computed: {
        markersData() {
            return this.$store.getters.markersData;
        },

        filteredMarkers() {
            let filteredData = [...this.markersData];

            if (this.filterByStatus) {
                filteredData = filteredData.filter(
                    (marker) => marker.status === parseInt(this.filterByStatus)
                );
            }

            if (this.filterByIntegrator) {
                filteredData = filteredData.filter(
                    (marker) => marker.integrator === this.filterByIntegrator
                );
            }

            if (this.sortByName) {
                filteredData.sort((a, b) => {
                    if (this.sortByName === "asc") {
                        return a.name.localeCompare(b.name);
                    } else {
                        return b.name.localeCompare(a.name);
                    }
                });
            }

            if (this.sortByID) {
                filteredData.sort((a, b) => {
                    if (this.sortByID === "asc") {
                        return a.id - b.id;
                    } else {
                        return b.id - a.id;
                    }
                });
            }

            return filteredData;
        },
        sortOptions() {
            return [
                { label: "Не сортировать", value: "" },
                { label: "По возрастанию", value: "asc" },
                { label: "По убыванию", value: "desc" }
            ];
        },
        statusOptions() {
            return [
                { label: "Все", value: "" },
                { label: "3 - работает", value: "3" },
                { label: "255 - нет сигнала", value: "255" }
            ];
        },
        integratorOptions() {
            return [
                { label: "Все", value: "" },
                { label: "voicelink", value: "voicelink" },
                { label: "komsignal", value: "komsignal" }
            ];
        }
    },
    data() {
        return {
            sortByName: "",
            sortByID: "",
            filterByStatus: "",
            filterByIntegrator: "",
        };
    },
    mounted() {
        this.$store.dispatch("fetchMarkersData");
    },

};
</script>
  

  

<style>
    .container {
        margin: 20px;
  
    }

    .selects {
        margin: 20px auto;
        grid-column: 1/4;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 10px;
    }

    .items {
        grid-column: 1/4;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 10px;
        
        
    }

    .item-id {
        grid-column: 1;
        border: 1px solid gray;
        padding: 5px;

    }

    .item-name {
        grid-column: 2;
        border: 1px solid gray;
        padding: 5px;
    }

    .item-status {
        grid-column: 3;
        border: 1px solid gray;
        padding: 5px;
    }

    .item-integrator {
        grid-column: 4;
        border: 1px solid gray;
        padding: 5px;
    }
</style>


