<template>
    <div class="statistics">
        <div class="integrators">
            <span>Статистика интеграторов</span>
            <span>Voicelink: {{ integratorVoice }}</span>
            <span>Komsignal: {{ integratorKoms }}</span>
        </div> 
        <BarChart class="chart" :chartData="chartData" />

    </div>
</template>
  

 
  
<script>
import BarChart from '../components/BarChart.vue'
import { mapState } from 'vuex';

export default {
    name: 'Stats',
    components: { BarChart },
    computed: {
        ...mapState(['markersData']),
        chartData() {
            const notWork = this.markersData.filter(marker => marker.status === 255).length;
            const work = this.markersData.filter(marker => marker.status === 3).length;

            return {
                labels: ['Не работают', 'Работают'],
                datasets: [
                    {
                        label: 'Светофоры',
                        data: [notWork, work],
                        backgroundColor: ['red','lightgreen'],
                    }
                ]
            };
        },
        integratorVoice() {
            return this.markersData.filter(marker => marker.integrator == 'voicelink').length;
        },
        integratorKoms() {
            return this.markersData.filter(marker => marker.integrator == 'komsignal').length;
        },
    },

    mounted() {
        this.$store.dispatch("fetchMarkersData");
    },
}
</script>
<style scoped>
.chart {
    max-width: 500px;
    max-height: 500px;
}

.integrators {
    display: flex;
    flex-direction: column;
    font-size: 40px;
    text-align: left;
    border: 2px solid gray;
    border-radius: 10px;
    padding: 10px;
}

.statistics {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1600px;
    margin: 0 auto;
    padding-top: 80px;
}
</style>
  