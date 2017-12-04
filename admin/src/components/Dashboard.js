import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Charts.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend ,PieChart, Pie, Sector,BarChart, Bar,} from 'recharts' ;
import {Responsive, WidthProvider} from 'react-grid-layout';
import { Link } from 'react-router-dom';
import {GetRevenue} from "../actions/index";
import {connect} from 'react-redux';
//const {PropTypes} = React;

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {activeIndex:0};
    }

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    }

    componentWillMount() {
        this.props.GetRevenue();
    }
    render() {
        /*
        const revenue = [
            {name: '2000',   amt: 2400},
            {name: '2001',   amt: 2210},
            {name: '2002',   amt: 2290},
            {name: '2003',   amt: 2000},
            {name: '2004',   amt: 2181},
            {name: '2005',   amt: 2500},
            {name: '2006',  amt: 2100},
            {name: '2007',  amt: 1600},
            {name: '2008',  amt: 1200},
            {name: '2009',  amt: 2400},
        ];
        */
        const bardata = [
            {name: 'Page A', uv: 4000, female: 2400, male: 2400},
            {name: 'Page B', uv: 3000, female: 1398, male: 2210},
            {name: 'Page C', uv: 2000, female: 9800, male: 2290},
            {name: 'Page D', uv: 2780, female: 3908, male: 2000},
            {name: 'Page E', uv: 1890, female: 4800, male: 2181},
            {name: 'Page F', uv: 2390, female: 3800, male: 2500},
            {name: 'Page G', uv: 3490, female: 4300, male: 2100},
        ];

        const getPath = (x, y, width, height) => {
            return `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;
        };


        const TriangleBar = (props) => {
            const { fill, x, y, width, height } = props;

            return <path d={getPath(x, y, width, height)} stroke="none" fill={fill}/>;
        };

        TriangleBar.propTypes = {
            fill: PropTypes.string,
            x: PropTypes.number,
            y: PropTypes.number,
            width: PropTypes.number,
            height: PropTypes.number,
        };

        const revenue=this.props.revenue;
        const data = [
            {name: '2000', sale: 40, revenue: 24, },
            {name: '2001', sale: 30, revenue: 13, },
            {name: '2002', sale: 20, revenue: 98, },
            {name: '2003', sale: 27, revenue: 39, },
            {name: '2004', sale: 18, revenue: 48, },
            {name: '2005', sale: 23, revenue: 38, },
            {name: '2006', sale: 34, revenue: 43, },
        ];
        var layout = {lg:[
                {i: 'a', x: 0, y: 0, w: 4, h: 6, static: true},
                {i: 'b', x: 1, y: 5, w: 4, h: 6, minW: 2, maxW: 4},
                {i: 'c', x: 4, y: 0, w: 4, h: 6},
                {i: 'd', x: 4, y: 0, w: 4, h: 6},
                {i: 'e', x: 4, y: 0, w: 4, h: 6}

            ]};

        const cities = [{name: 'citi A', value: 400}, {name: 'citi B', value: 300},
            {name: 'citi C', value: 300}, {name: 'citi D', value: 200}];


        return (
            <div className="App">


                <div className="rowItem" >
                    <div className="Dashboard panel panel-body" >

                        <div className="maestro-nav__feature-wrap"><Link to="/Flights"><label className="label-color">Flights</label></Link></div>
                        <div className="maestro-nav__feature-wrap"><Link to="/Hotels"><label className="label-color">Hotels</label></Link></div>
                        <div className="maestro-nav__feature-wrap"><Link to="/Cars"><label className="label-color">Cars</label></Link></div>
                        <div className="maestro-nav__feature-wrap"><Link to="/Users" className="label-color">Users</Link></div>
                        <div className="maestro-nav__feature-wrap"><Link to="/Dashboard"><label className="label-color">Analysis</label></Link></div>

                        <div className="maestro-nav__feature-wrap">
                            <input type="submit" className="btn btn-info" value="sign out" onClick={() => {
                                this.props.logOut()}} />
                        </div>
                    </div>

                    <div className="graphs" >
                        <ResponsiveReactGridLayout  className="layout" rowHeight={50}  layouts={layout}
                                                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480,}}
                                                    cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
                            <div className="eachGridBorder" key="a">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        activeIndex={this.state.activeIndex}
                                        activeShape={renderActiveShape}
                                        data={revenue}
                                        cx={200}
                                        cy={100}
                                        innerRadius={40}
                                        outerRadius={60}
                                        fill="#fba572"
                                        onMouseEnter={this.onPieEnter}
                                    />
                                </PieChart>


                            </div>
                            <div className="eachGridBorder" key="b">
                                <LineChart width={400} height={300} data={revenue}
                                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="bookingtype"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="#fba572" activeDot={{r: 8}}/>
                                </LineChart>

                            </div>
                            <div className="eachGridBorder" key="c">
                                <LineChart width={400} height={300} data={data}
                                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="#fba572" activeDot={{r: 8}}/>
                                    <Line type="monotone" dataKey="sale" stroke="#82ca9d" />
                                </LineChart>


                            </div>
                            <div className="eachGridBorder" key="d">
                                <BarChart width={400} height={200} data={bardata}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Bar dataKey="female" fill="#8884d8" label/>
                                </BarChart>
                            </div>

                            <div className="eachGridBorder" key="e">
                                <BarChart width={600} height={300} data={bardata}
                                          margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Bar dataKey="female" fill="#8884d8" shape={<TriangleBar/>} label/>
                                </BarChart>
                            </div>
                        </ResponsiveReactGridLayout>
                    </div>
                </div>

            </div>
        );
    }
}



const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const mapStateToProps=(state)=> {
    return {
        revenue:state.reducer2.revenue
    };
};

const mapDispatchToProps=(dispatch)=> {
    return {
        //logOut:()=>dispatch(logOut()),
        GetRevenue:()=>dispatch(GetRevenue())
        //GetHotelDetails:(hotel_id)=>dispatch(GetHotelDetails(hotel_id)),
        //update_hotel:(hotel_id,hotel_name,city,price,reviews,stars)=>dispatch(update_hotel(hotel_id,hotel_name,city,price,reviews,stars)),
        //add_hotel:(hotel_name,city,price,reviews,stars)=>dispatch(add_hotel(hotel_name,city,price,reviews,stars))

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

