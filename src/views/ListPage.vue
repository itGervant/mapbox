<template>
    <div class="container">
        <div class="selects">
            <my-select label="Сортировка по ID:" v-model="sortByID" :options="filters.sort"></my-select>
            <my-select label="Сортировка по имени:" v-model="sortByName" :options="filters.sort"></my-select>
            <my-select label="Фильтр по статусу:" v-model="filterByStatus" :options="filters.status"></my-select>
            <my-select label="Фильтр по интегратору:" v-model="filterByIntegrator" :options="filters.integrator"></my-select>
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

const FILTERS = {
    status: [
        { label: "Все", value: "" },
        { label: "3 - работает", value: "3" },
        { label: "255 - нет сигнала", value: "255" }
    ],
    integrator: [
        { label: "Все", value: "" },
        { label: "voicelink", value: "voicelink" },
        { label: "komsignal", value: "komsignal" }
    ],
    sort: [
        { label: "Не сортировать", value: "" },
        { label: "По возрастанию", value: "asc" },
        { label: "По убыванию", value: "desc" }
    ]
};

export default {
    components: { MySelect },
    computed: {
        filters() {
            return FILTERS;
        },
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

            if (this.sortByName || this.sortByID) {
                filteredData.sort((a, b) => {
                    if (this.sortByName) {
                        if (this.sortByName === "asc") {
                            const nameComparison = a.name.localeCompare(b.name);
                            if (nameComparison !== 0) {
                                return nameComparison;
                            }
                        } else {
                            const nameComparison = b.name.localeCompare(a.name);
                            if (nameComparison !== 0) {
                                return nameComparison;
                            }
                        }
                    }

                    if (this.sortByID) {
                        if (this.sortByID === "asc") {
                            return a.id - b.id;
                        } else {
                            return b.id - a.id;
                        }
                    }

                    return 0;
                });
            }

            return filteredData;
        },
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
    grid-template-columns: 40px 2fr 40px 1fr;
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

@media (max-width: 769px) {
    .selects {
        grid-template-columns: repeat(4, 1fr);
    }

    .items {
        grid-gap: 0;
        grid-template-columns: 40px 2fr 40px 1fr;
    }

    @media (max-width: 600px) {
        .selects {
            grid-template-columns: repeat(2, 1fr);
        }
        .item-id,
        .item-name,
        .item-status,
        .item-integrator {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid gray;
            padding: 2px;
        }
    }

    @media (max-width: 425px) {
        .selects {
            grid-template-columns: repeat(2, 1fr);
        }

        .items {
            grid-gap: 0;
            grid-template-columns: 40px 2fr 40px 1fr;
        }
    }

    @media (max-width: 370px) {
        .items {
            grid-gap: 0;
            grid-template-columns: 30px 2fr 30px 1fr;
        }


    }
}
</style>


