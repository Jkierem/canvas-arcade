class Color {
  constructor( red , green , blue ){
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  mult( color ){
    const result = new Color(0,0,0);
    result.red = this.red * color;
    result.green = this.green * color;
    result.blue = this.blue * color;
    return result;
  }

  add( color ){
    const result = new Color(0,0,0);
    result.red = this.red + color.red;
    result.green = this.green + color.green;
    result.blue = this.blue + color.blue;
    return result;
  }

  sub( color ){
    const result = new Color(0,0,0);
    result.red = this.red - color.red;
    result.green = this.green - color.green;
    result.blue = this.blue - color.blue;
    return result;
  }

  prepareNumber( number ){
    const str = Number(Math.floor(number)).toString(16)
    return str.length > 1 ? str : `0${str}`;
  }

  toHexString( ){
    const { red , green , blue , prepareNumber } = this
    return `#${prepareNumber(red)}${prepareNumber(green)}${prepareNumber(blue)}`
  }

}

export default Color;
