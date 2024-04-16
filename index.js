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
    
    draw() {
        try {
            let data_sets  = [];
	    let chart_data = this.data();
           
            /* check color */
	    if (0 === this.mainColor().length) {
                /* init color */
		let clr_lst = this.getColorList();
                for (let cidx=0; cidx < chart_data.length; cidx++) {
                    this.mainColor(clr_lst[cidx]);
		}
            }
            
	    for (let didx in chart_data) {
                data_sets.push({
                    label: this.dataLabels()[didx],
		    data:  chart_data[didx],
		    backgroundColor: this.baseColor()[didx],
		    borderColor:     this.mainColor()[didx],
		    borderWidth:     this.borderWidth()
		});
	    }

	    let plugins = null;
	    if (null !== this.title()) {
                plugins = {
                    title: {
                        display: true,
                        text: this.title()
		    }
		};
	    }

            /* check plugins */
            if (null !== plugins) {
                let opt = this.options();
                if (undefined === opt.plugins) {
                    opt.plugins = plugins;
                } else {
                    for (let pidx in plugins) {
                        opt.plugins[pidx] = plugins[pidx];
		    }
		}
                this.options(opt);
            }

            const ChartObj = new Chart(this.rootDom()[0].getRawDom().getContext("2d"), {
                type: this.type(),
                data: {
                    labels: this.dataIndex(),
                    datasets: data_sets
                },
                options: this.options()
            });
            
	    this.confmng("Chart", ChartObj);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
