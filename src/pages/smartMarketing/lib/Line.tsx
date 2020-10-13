interface ILineOptions{
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  w: number,
  h: number
}

/**
 * Line连线类
 * 1、构建和加载Line
 * 2、根据两个Node节点之间的位置创建连线路径以及箭头指向路径
 */
export default class Line{
  id: number;
  pId: number;
  cId: number;
  options: ILineOptions;
  pathList: {
    d0?: string,
    d1?: string,
  };

  constructor(options:ILineOptions, pId: number, cId: number,) {
    this.id = Math.random()*100 + Date.now();
    this.pId = pId;
    this.cId = cId;
    this.options = options;
    this.pathList = {};
    
    this.drawLinePath(options);
  }
  getNomalLine(x1:number,y1:number,x2:number,y2:number, _small?:boolean){
    const _dis = _small ? 1.2: 6;
    const _mid = _small ? 1: 3;

    const midx = x1 +  (x2 - x1) / 2;
    // const midy = y1 +  (y2 - y1) / 2;

    const _x1 = x2 > x1 ? midx - _dis : midx + _dis;
    const _x2 = x2 > x1 ? midx - _mid : midx + _mid;
    const _x3 = x2 > x1 ? midx + _mid : midx - _mid ;
    const _x4 = x2 > x1 ? midx + _dis : midx - _dis;

    const _y1 = y2 > y1 ? y1 + _mid : y1 - _mid;
    const _y2 = y2 > y1 ? y1 + _dis : y1 - _dis;

    const _y3 = y2 > y1 ? y2 - _dis : y2 + _dis;
    const _y4 = y2 > y1 ? y2 - _mid : y2 + _mid;
    // return `M ${x1} ${y1} L ${midx} ${y1} L ${midx} ${y2} L ${x2} ${y2}`
    return `
    M ${x1} ${y1} L ${_x1} ${y1} 
    C ${_x2} ${y1} ${midx} ${_y1} ${midx} ${_y2}
    L ${midx} ${_y3}
    C ${midx} ${_y4} ${_x3} ${y2} ${_x4} ${y2}
    L ${x2} ${y2}
    `;
  }
  getQuirkLine(x1:number,y1:number,x2:number,y2:number, _small?:boolean){
    const _dis = _small ? 2: 6;
    const _mid = _small ? 1: 3;

    const midx = x2;
    // const midy = y1 +  (y2 - y1) / 2;

    const _x1 = x2 > x1 ? midx - _dis : midx + _dis;
    const _x2 = x2 > x1 ? midx - _mid : midx + _mid;

    const _y1 = y2 > y1 ? y1 + _mid : y1 - _mid;
    const _y2 = y2 > y1 ? y1 + _dis : y1 - _dis;

    // return `M ${x1} ${y1} L ${midx} ${y1} L ${midx} ${y2} L ${x2} ${y2}`
    return `
    M ${x1} ${y1} L ${_x1} ${y1} 
    C ${_x2} ${y1} ${midx} ${_y1} ${midx} ${_y2}
    L ${x2} ${y2}
    `;
  }
  /**
   * drawLinePath 参数
   * @param {x1,y1,x2,y2, w, h} options 
   */
  drawLinePath(options:ILineOptions){
    this.options = options;

    const x1 = options.x1;
    const y1 = options.y1;
    const x2 = options.x2;
    const y2 = options.y2;
    const w = options.w;
    const h = options.h;
    
    let startX = x1;
    let startY = y1;
    let endX = x2;
    let endY = y2;

    const a_l = 8;    // 箭头的长度
    const a_h = 4;    // 箭头的单侧高度
    let a_direct= 'left'; // 箭头的方向

    let d0 = '';  // 直线路径
    let d1 = '';  // 箭头路径

    let _normalStatus = false;
    let _quirkMode = false;
    const absX = Math.abs(x1-x2);
    const absY = Math.abs(y1-y2);

    // 正上
    if ((y1 > y2) && (absX < w / 1.5)){
      startX = x1 + w / 2;
      startY = y1;
      endX = startX;
      endY = y2 + h;
      _normalStatus = false;
      a_direct = 'top';
    }
    // 正左
    else if ((x1 > x2) && (absY < h / 1.5)) {
      startX = x1;
      startY = y1 + h / 2;
      endX = x2 + w;
      // endY = startY;
      endY = y2 + h / 2;
      _normalStatus = false;
      a_direct = 'left';
    }
    // 正下
    else if ((y2 > y1) && (absX < w /1.5)) {
      startX = x1 + w/2;
      startY = y1 + h;
      endX = startX;
      endY = y2;
      _normalStatus = false;
      a_direct = 'bottom';
    }
    // 正右
    else if ((x2 >x1) && (absY < h / 3)) {
      startX = x1 + w;
      startY = y1 + h / 2;
      endX = x2;
      // endY = startY;
      endY = y2 + h / 2;
      _normalStatus = false;
      a_direct = 'right';
    }
    // 正右下
    else if ((x2 > x1) && (absX < (w+10)) && ( y2>y1)) {
      startX = x1 + w;
      startY = y1 + h / 2;
      endX = x2 + w / 2;
      endY = y2;
      _quirkMode = true;
      a_direct = 'bottom';
    }
    // 正左下
    else if ((x2 < x1) && (absX < (w+10)) && (y2 > y1)) {
      startX = x1;
      startY = y1 + h / 2;
      endX = x2 + w / 2;
      endY = y2;
      _quirkMode = true;
      a_direct = 'bottom';
    }
    // 正左上
    else if ((x2 < x1) && (absX < (w+10)) && (y1 > y2)) {
      startX = x1;
      startY = y1 + h / 2;
      endX = x2 + w / 2;
      endY = y2 + h;
      _quirkMode = true;
      a_direct = 'top';
    }
    // 正右上
    else if ((x2 > x1) && (absX < (w+10)) && (y1 > y2)) {
      startX = x1 + w;
      startY = y1 + h / 2;
      endX = x2 + w / 2;
      endY = y2 + h;
      _quirkMode = true;
      a_direct = 'top';
    }
    // 左上
    else if ((y1 > y2) && (x1 > x2)) {
      startX = x1;
      startY = y1 + h / 2;
      endY = y2 + h / 2;
      endX = x2 + w;
      _normalStatus = true;
      a_direct = 'left';
    } 
    // 右上
    else if ((y1 > y2) && (x2 > x1)) {
      startX = x1 + w;
      startY = y1 + h / 2;
      endY = y2 + h / 2;
      endX = x2;
      _normalStatus = true;
      a_direct = 'right';
    }
    // 下左
    else if ((y2 > y1) && (x1 > x2)) {
      startX = x1;
      startY = y1 + h / 2;
      endY = y2 + h / 2;
      endX = x2 + w;
      _normalStatus = true;
      a_direct = 'left';
    }
    // 右下
    else if ((y2 > y1) && (x2 > x1)) {
      startX = x1 + w;
      startY = y1 + h / 2;
      endY = y2 + h / 2;
      endX = x2;
      _normalStatus = true;
      a_direct = 'right';
    }
    // 线条路径绘制
    if (_quirkMode) {
      d0 = this.getQuirkLine(startX, startY, endX, endY);
    }
    else if (_normalStatus) {
      d0 = this.getNomalLine(startX, startY, endX, endY);
    } 
    // 正左和正右做特殊处理
    else if ((a_direct === 'right' || a_direct === 'left') && (absY > 1.5)) {
      d0 = this.getNomalLine(startX, startY, endX, endY, true);        
    } else {
      d0 = `M ${startX} ${startY} L ${endX} ${endY}`
    }
    // 箭头路径绘制
    if (a_direct === 'left') {
      d1 = `M ${endX} ${endY} L ${endX + a_l } ${endY - a_h} L ${endX + a_l - 2 } ${endY} L ${endX + a_l } ${endY + a_h} z`;
    } else if (a_direct === 'right') {
      d1 = `M ${endX} ${endY} L ${endX - a_l } ${endY - a_h} L ${endX - a_l + 2 } ${endY} L ${endX - a_l } ${endY + a_h} z`;
    } else if (a_direct === 'top') {
      d1 = `M ${endX} ${endY} L ${endX - a_h } ${endY + a_l} L ${endX} ${endY + a_l - 2} L ${endX + a_h } ${endY + a_l} z`
    } else {
      d1 = `M ${endX} ${endY} L ${endX - a_h } ${endY - a_l} L ${endX} ${endY - a_l + 2} L ${endX + a_h } ${endY - a_l} z`
    }
    this.pathList = { d0,  d1 };
  }
  // 保存
  toJson(){
    return {
      pId:this.pId,
      cId:this.cId,
    }
  }
}