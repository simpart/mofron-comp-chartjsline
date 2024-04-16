/**
 * @file mofron-comp-chartjs/index.js
 * @brief chart.js component for mofron
 * @license MIT
 */
const mfChart = require("mofron-comp-chartjs");
const {Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend} = require("chart.js");
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

module.exports = class extends mfChart {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("ChartJSLine");
            
	    /* init config */
	    this.type('line');
	    this.options({
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0
                    }
                }
            });

	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
