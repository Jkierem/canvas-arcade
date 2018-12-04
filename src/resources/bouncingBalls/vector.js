export class Vector {
  constructor( ...values ){
    this.values = values;
  }

  static transform( a , transformation ){
    const result = new Vector( ...a.values );
    result.values = [...this.values];
    return transformation( result );
  }

  static map( a , transformation ){
    const result = new Vector( ...a.values );
    result.values = a.values.map( transformation );
    return result;
  }

  static translate( a , b ){
    return Vector.map( a , ( v , index ) => {
      return v + b.values[index];
    })
  }

  static scale( a , b ){
    return Vector.map( a , ( v , index ) => {
      return v * b.values[index];
    })
  }

  translate = ( other ) => {
    return Vector.translate( this , other );
  }

  scale = ( other ) => {
    return Vector.scale( this , other );
  }

  map = ( iteratee ) => {
    return Vector.map( this , iteratee );
  }

  transform = ( transformation ) => {
    return Vector.transform( this , transformation );
  }

  scalarMult = ( scalar ) => {
    return Vector.map( this , v => v * scalar )
  }

  modulo = ( ) => {
    return Math.sqrt( this.values.reduce( (agg , v) => agg + (v*v) , 0 ) )
  }

  normalize = ( ) => {
    const mod = this.modulo( )
    return this.map( v => v/mod );
  }

  get x( ){ return this.values[0] }
  get y( ){ return this.values[1] }
}

export class Vector2 extends Vector{
  constructor( x = 0 , y = 0 ){
    super( x , y );
  }
}
