module powerbi.extensibility.visual.pb180E482A11328DB4F39A2539D267E04FC61  {
  "use strict";
  import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

  export class VisualSettings extends DataViewObjectsParser {
    public pie: PieSettings = new PieSettings();
    public vor: VorSettings = new VorSettings();
    public animation: AnimationSettings = new AnimationSettings();
    public insideValue: InsideValueSettings = new InsideValueSettings();
  }

  export class Margin {
    constructor() { }

    public top: number = 20;
    public right: number = 20;
    public bottom: number = 20;
    public left: number = 20;
  }

  export class AnimationSettings {
    public show: boolean = true;
    public duration: number = 500;
  }

  export class PieSettings {
    public show: boolean = true;
    public defaultColor: string = "#E91E63";
    public emptyColor: string = "#fff";
    public arcSize: number = 3;
  }

  export class InsideValueSettings {
    public show: boolean = true;
    public defaultColor: string = "#E91E63";
    public fontFamily: string = "helvetica, arial, sans-serif";
    public fontSize: number = 13;
    public multiplier: boolean = true;
    public nanText: string = "Empty";
    public suffix: string = "%";
  }

  export class VorSettings {
    public show: boolean = false;
    public lowColor: string = "red";
    public middleColor: string = "orange";
    public highColor: string = "green";
    public onValue: boolean = true;
    public onPie: boolean = false;
    public fixedValues: boolean = true;
    public firstValue: number = 25;
    public secondValue: number = 75;
    public multiplier: boolean = true;
  }
}
