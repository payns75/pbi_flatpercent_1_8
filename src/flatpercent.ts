module powerbi.extensibility.visual {
    "use strict";

    export class FlatPercent {
        private pie = d3.layout.pie().sort(null);
        private dpath: d3.selection.Update<d3.layout.pie.Arc<number>>;
        private path: d3.Selection<d3.layout.pie.Arc<number>>;
        private pathback: d3.Selection<number>;
        private pathback2: d3.Selection<number>;
        private path2: d3.Selection<d3.layout.pie.Arc<number>>;
        private text: d3.Selection<string>;
        private previousvalue: number = null;
        private previousangle = 0;

        constructor(private gcontainer: d3.Selection<SVGElement>, public margin: Margin = null) {
            if (!this.margin) {
                this.margin = new Margin();
            }

            this.pathback = this.gcontainer
                .append('g')
                .selectAll('path')
                .data([100])
                .enter()
                .append('path');

            this.pathback2 = this.gcontainer
                .append('g')
                .selectAll('path')
                .data([100])
                .enter()
                .append('path');

            this.dpath = this.gcontainer
                .append('g')
                .selectAll('path')
                .data(this.pie([0]));

            this.path = this.dpath
                .enter()
                .append('path');

            this.path2 = this.dpath
                .enter()
                .append('path');

            this.text = this.gcontainer
                .append('g')
                .selectAll('text')
                .data([''])
                .enter()
                .append('text')
                .attr("dy", "0.5ex")
                .attr('text-anchor', 'middle');
        }

        public Update(options: VisualUpdateOptions, settings: VisualSettings, value: number) {
            const radius = this.initContainer(options, settings);
            const arcsize = radius * settings.pie.arcSize / 100;

            value = this.formatValue(settings, value);
            let isvalidvalue = this.isvalidvalue(value);

            if (isvalidvalue && value > 0 && settings.pie.show) {
                const arc = d3.svg.arc()
                    .outerRadius(radius)
                    .innerRadius(radius - arcsize);

                const arc2 = d3.svg.arc()
                    .outerRadius(radius - arcsize)
                    .innerRadius(radius - arcsize * 2);

                let values = [value > 100 ? 100 : value];

                if (value < 100) {
                    values.push(100 - value);
                }

                this.pathback.data(this.pie([100]))
                    .attr('fill', settings.pie.emptyColor)
                    .attr("d", <any>arc);

                this.pathback2.data(this.pie([100]))
                    .attr('fill', settings.pie.secondEmptyColor)
                    .attr("d", <any>arc2);

                const pieColor = settings.vor.show && settings.vor.onPie ? this.getVorColor(options.dataViews[0].categorical, settings, value) : settings.pie.defaultColor;
                const pieColor2 = settings.vor.show && settings.vor.onPie ? this.getVorColor(options.dataViews[0].categorical, settings, value) : settings.pie.secondcolor;

                this.path.data(this.pie(values))
                    .attr('fill', pieColor);

                this.path2.data(this.pie(values))
                    .attr('fill', pieColor2);

                if (value !== this.previousvalue && settings.animation.show) {
                    // Nouvelle version d3 réutiliser https://github.com/d3/d3-transition
                    this.addTransistion(this.path, arc, settings.animation.duration);
                    this.addTransistion(this.path2, arc2, settings.animation.duration);
                } else {
                    this.path.attr("d", <any>arc);
                    this.path2.attr("d", <any>arc2);
                }
            }

            this.previousvalue = value;
            let textcolor = settings.insideValue.defaultColor;

            if (isvalidvalue && settings.vor.show && settings.vor.onValue) {
                textcolor = this.getVorColor(options.dataViews[0].categorical, settings, value);
            }

            let textValue = isvalidvalue ? `${value}${settings.insideValue.suffix}` : settings.insideValue.nanText;
            textValue = settings.insideValue.show ? textValue : '';

            this.text.data([textValue])
                .style('font-family', settings.insideValue.fontFamily)
                .style('font-size', `${settings.insideValue.fontSize}vmin`)
                .style('fill', textcolor)
                .text(d => d);
        }

        private isvalidvalue(value: number): boolean {
            if (value === 0) {
                return true;
            }

            return value && !isNaN(Number(value.toString())) && value !== Infinity;
        }

        private getVorColor(categorical: DataViewCategorical, settings: VisualSettings, value: number): string {
            let measurevorlow = settings.vor.firstValue;
            let measurevormiddle = settings.vor.secondValue;

            if (!settings.vor.fixedValues) {
                measurevorlow = Visual.getvalue(categorical, "measurevorlow");
                measurevormiddle = Visual.getvalue(categorical, "measurevormiddle");

                measurevorlow = settings.vor.multiplier ? measurevorlow * 100 : measurevorlow;
                measurevormiddle = settings.vor.multiplier ? measurevormiddle * 100 : measurevormiddle;

                measurevorlow = this.formatValue(settings, measurevorlow);
                measurevormiddle = this.formatValue(settings, measurevormiddle);

                settings.vor.firstValue = measurevorlow;
                settings.vor.secondValue = measurevormiddle;
            }

            if (value < measurevorlow) {
                return settings.vor.lowColor;
            } else if (value > measurevorlow && value < measurevormiddle) {
                return settings.vor.middleColor;
            } else {
                return settings.vor.highColor;
            }
        }

        private formatValue(settings: VisualSettings, value: number) {
            if (settings.insideValue.multiplier) {
                value *= 100;
            }

            // TODO: Format value by settings ?
            return Math.round(value);
        }

        private initContainer(options: VisualUpdateOptions, settings: VisualSettings): number {
            const gHeight = options.viewport.height - this.margin.top - this.margin.bottom;
            const gWidth = options.viewport.width - this.margin.right - this.margin.left;

            this.gcontainer.attr({
                height: gHeight,
                width: gWidth
            });

            this.gcontainer.attr('transform', `translate(${gWidth / 2}, ${gHeight / 2})`);

            return Math.min(gWidth, gHeight) / 2;
        }

        private addTransistion(p: d3.Selection<d3.layout.pie.Arc<number>>, a: any, duration: number) {
            p.transition()
                .duration(duration)
                .attrTween('d', (d) => {
                    const i = d3.interpolate(this.previousangle, d.endAngle);

                    return (t) => {
                        d.endAngle = i(t);
                        this.previousangle = d.endAngle;
                        return a(<any>d);
                    };
                });
        }
    }
}