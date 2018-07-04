module powerbi.extensibility.visual.pb180E482A11328DB4F39A2539D267E04FC61  {
    "use strict";

    export class FlatPercent {
        private arcContainer: d3.Selection<SVGElement>;
        private pie = d3.layout.pie().sort(null);
        private text: d3.Selection<string>;
        private previousvalue: number = null;

        constructor(private gcontainer: d3.Selection<SVGElement>, public margin: Margin = null) {
            if (!this.margin) {
                this.margin = new Margin();
            }

            this.arcContainer = this.gcontainer.append('g').attr('class', 'arccontainer');

            const textContainer = this.gcontainer.append('g').attr('class', 'textcontainer');
            this.text = textContainer.selectAll('.textcontainer')
                .data([''])
                .enter()
                .append('text')
                .attr('text-anchor', 'middle');
        }

        public Update(options: VisualUpdateOptions, settings: VisualSettings, value: number) {
            const init = this.initContainer(options, settings);

            if (settings.insideValue.multiplier) {
                value *= 100;
            }

            value = this.formatValue(settings, value);

            let isvalidvalue = this.isvalidvalue(value);

            this.arcContainer.selectAll('path').remove();

            if (isvalidvalue && value > 0 && settings.pie.show) {
                const radius = Math.min(init.gWidth, init.gHeight) / 2;
                const arc = d3.svg.arc()
                    .outerRadius(radius)
                    .innerRadius(radius * (100 - settings.pie.arcSize) / 100);

                const arc2 = d3.svg.arc()
                    .outerRadius(radius-settings.pie.arcSize)
                    .innerRadius((radius-settings.pie.arcSize) * (100 - settings.pie.arcSize) / 100);

                let values = [value > 100 ? 100 : value];

                if (value < 100) {
                    values.push(100 - value);
                }

                const dpath = this.arcContainer
                    .attr('transform', `translate(${init.gWidth / 2},${init.gHeight / 2})`)
                    .selectAll('path')
                    .data(this.pie(values));

                const pieColor = settings.vor.onPie ? this.getVorColor(options.dataViews[0].categorical, settings, value) : settings.pie.defaultColor;
                const pieColor2 = settings.vor.onPie ? this.getVorColor(options.dataViews[0].categorical, settings, value) : settings.pie.secondcolor;

                const path = dpath
                    .enter().append('path')
                    .attr('fill', (d, i) => i ? settings.pie.emptyColor : pieColor);

                const path2 = dpath
                    .enter().append('path')
                    .attr('fill', (d, i) => i ? settings.pie.emptyColor : pieColor2);

                if (value !== this.previousvalue && settings.animation.show) {
                    path.transition().delay((d, i) => i * settings.animation.duration).duration(settings.animation.duration)
                        .attrTween('d', (d) => {
                            const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                            return (t) => {
                                d.endAngle = i(t);
                                return arc(<any>d);
                            };
                        });

                        path2.transition().delay((d, i) => i * settings.animation.duration).duration(settings.animation.duration)
                        .attrTween('d', (d) => {
                            const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                            return (t) => {
                                d.endAngle = i(t);
                                return arc2(<any>d);
                            };
                        });

                } else {
                    path.attr("d", <any>arc);
                    path2.attr("d", <any>arc2);
                }

                dpath.exit()
                    .remove();
            }


            this.previousvalue = value;

            let textcolor = settings.insideValue.defaultColor;

            if (isvalidvalue && settings.vor.onValue) {
                textcolor = this.getVorColor(options.dataViews[0].categorical, settings, value);
            }

            let textValue = isvalidvalue ? `${value}${settings.insideValue.suffix}` : settings.insideValue.nanText;
            textValue = settings.insideValue.show ? textValue : '';

            this.text.data([textValue])
                .style('font-family', settings.insideValue.fontFamily)
                .style('font-size', `${settings.insideValue.fontSize}vmin`)
                .attr("y", init.gHeight / 2)
                .attr("x", init.gWidth / 2)
                .attr("dy", "0.5ex")
                .style('fill', textcolor)
                .text(d => {
                    return d;
                });
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

            if (settings.vor.show) {
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

            return settings.insideValue.defaultColor;
        }

        private formatValue(settings: VisualSettings, value: number) {
            // TODO: Format value by settings.
            return Math.ceil(value);
        }

        private initContainer(options: VisualUpdateOptions, settings: VisualSettings): any {
            const gHeight = options.viewport.height - this.margin.top - this.margin.bottom;
            const gWidth = options.viewport.width - this.margin.right - this.margin.left;

            this.gcontainer.attr({
                height: gHeight,
                width: gWidth
            });

            this.gcontainer.attr('transform',
                'translate(' + this.margin.left + ',' + this.margin.top + ')');

            return { gHeight, gWidth };
        }
    }
}