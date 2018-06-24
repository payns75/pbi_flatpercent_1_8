module powerbi.extensibility.visual.pb180E482A11328DB4F39A2539D267E04FC61  {
    "use strict";
    export class Visual implements IVisual {
        private settings: VisualSettings;
        private svg: d3.Selection<SVGElement>;
        private gcontainer: d3.Selection<SVGElement>;
        private flatpercent: FlatPercent;

        constructor(options: VisualConstructorOptions) {
            this.svg = d3.select(options.element).append('svg');
            this.gcontainer = this.svg.append('g').classed('percenter', true);
            this.flatpercent = new FlatPercent(this.gcontainer, { top: 5, right: 1, bottom: 1, left: 1 });
        }

        public update(options: VisualUpdateOptions) {
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
            let value = Visual.getvalue(options.dataViews[0].categorical, "measure");

            this.svg.attr({
                height: options.viewport.height,
                width: options.viewport.width
            });

            this.flatpercent.Update(options, this.settings, value);

            // let titlealign = 1;
            // let titlex = 0;
            // let titleanchor = 'middle';
            // let titletext = 'une description du composent';

            // if (titlealign === 0) {
            //     titlex = 0;
            //     titleanchor = 'start';
            // } else if (titlealign === 1) {
            //     titlex = options.viewport.width / 2;
            //     titleanchor = 'middle';

            // } else if (titlealign === 2) {
            //     titlex = options.viewport.width;
            //     titleanchor = 'end';
            // }

            // titlex = options.viewport.width / 2;

            // this.svg.selectAll('.titlevalue').remove();
            // this.svg.append('g').append('text')
            //     .style('font-size', '5vw')
            //     .attr("x", titlex)
            //     .attr("y", 20)
            //     .attr('text-anchor', titleanchor)
            //     .style('fill', 'blue')
            //     .attr('class', 'titlevalue')
            //     .text(titletext);
        }

        public static getvalue(categorical: DataViewCategorical, name: string): number {
            const item = categorical.values.filter(f => f.source.roles[name]).map(m => m.values[0]);

            if (item && item.length === 1) {
                return +item[0];
            }
        }

        /**
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
         * objects and properties you want to expose to the users in the property pane.
         *
         */
        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            const item = VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);

            const elem = (item as any).instances[0];


            // if (elem.objectName === "pie") {
            //     elem.properties["plop"] = 12;
            //     console.log(elem);
            // }

            return item;
        }
    }
}