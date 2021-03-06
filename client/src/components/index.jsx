import React from 'react';
import axios from 'axios';

import Title from './Title';
import Header from './Header';
import Subtitle from './Subtitle';
import Tooltip from './Tooltip';
import ZestimateTooltip from './ZestimateTooltip';
import Chart from './Chart';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showZestimate: false,
      showSalesRange: false,
      showHistory: false,
      showChart: false,
      tooltipLeft: 0,
      triggerOffsetTop: 0,
      zestimate: 0,
      salesRange: 0,
      graphData: {},
      updateZestimate: '',
    };
    this.handleZestimateClick = this.handleZestimateClick.bind(this);
    this.handleSalesClick = this.handleSalesClick.bind(this);
    this.handleHistoryClick = this.handleHistoryClick.bind(this);
  }

  componentDidMount() {
    axios.get('/seed')
      .then((response) => {
        const {
          zestimate, salesRange, graphData, updateZestimate,
        } = response.data[response.data.length - 1];
        this.setState({
          zestimate,
          salesRange,
          graphData,
          updateZestimate,
          showChart: true,
        });
      });
  }

  handleZestimateClick(e) {
    const { showZestimate } = this.state;
    this.setState({
      showZestimate: !showZestimate,
      triggerOffsetTop: e.target.offsetTop,
      tooltipLeft: e.target.offsetLeft + e.target.clientWidth + 10,
    });
  }

  handleSalesClick(e) {
    const { showSalesRange } = this.state;
    this.setState({
      showSalesRange: !showSalesRange,
      triggerOffsetTop: e.target.offsetTop,
      tooltipLeft: e.target.offsetLeft + e.target.clientWidth + 10,
    });
  }

  handleHistoryClick(e) {
    const { showHistory } = this.state;
    this.setState({
      showHistory: !showHistory,
      triggerOffsetTop: e.target.offsetTop,
      tooltipLeft: e.target.offsetLeft + e.target.offsetWidth + 10,
    });
  }

  render() {
    const {
      showZestimate, showSalesRange, showHistory, showChart, triggerOffsetTop, tooltipLeft, zestimate, salesRange, graphData, updateZestimate,
    } = this.state;
    return (
      <div>
        <br />
        <br />
        <Header />
        <div id="title-div">
          <Title
            price={zestimate}
            priceRange={salesRange}
            onZestimateClick={this.handleZestimateClick}
            onSalesClick={this.handleSalesClick}
          />
        </div>
        {showZestimate
          && (
            <ZestimateTooltip
              triggerOffsetTop={triggerOffsetTop}
              tooltipLeft={tooltipLeft}
              updateZestimate={updateZestimate}
            />
          )}
        {showSalesRange
          && (
          <Tooltip
            triggerOffsetTop={triggerOffsetTop}
            left={tooltipLeft}
          >
          We calculate the estimated sales range based on the current market and the info we have about this home.
          </Tooltip>
          )}
        {showHistory
          && (
          <Tooltip
            triggerOffsetTop={triggerOffsetTop}
            left={tooltipLeft}
          >
          See a Zestimate jump? The Zestimate can change when the home is listed for sale, the home facts are updated, or the market fluctuates.
          </Tooltip>
          )}
        <Subtitle
          onHistoryClick={this.handleHistoryClick}
        />
        {showChart && <Chart data={graphData} />}
      </div>
    );
  }
}

export default Graph;
