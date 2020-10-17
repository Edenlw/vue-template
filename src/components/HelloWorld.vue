<!--
 * @Author: your name
 * @Date: 2020-10-13 17:12:27
 * @LastEditTime: 2020-10-17 14:55:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-template\src\components\HelloWorld.vue
-->
<template>
  <div>
    <svg width="960" height="600"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {
    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const nodesData = [
      { name: 'Lillian', sex: 'F' },
      { name: 'Gordon', sex: 'M' },
      { name: 'Sylvester', sex: 'M' },
      { name: 'Mary', sex: 'F' },
      { name: 'Helen', sex: 'F' },
      { name: 'Jamie', sex: 'M' },
      { name: 'Jessie', sex: 'F' },
      { name: 'Ashton', sex: 'M' },
      { name: 'Duncan', sex: 'M' },
      { name: 'Evette', sex: 'F' },
      { name: 'Mauer', sex: 'M' },
      { name: 'Fray', sex: 'F' },
      { name: 'Duke', sex: 'M' },
      { name: 'Baron', sex: 'M' },
      { name: 'Infante', sex: 'M' },
      { name: 'Percy', sex: 'M' },
      { name: 'Cynthia', sex: 'F' }
    ];

    const linksData = [
      { source: 'Sylvester', target: 'Gordon', type: 'A' },
      { source: 'Sylvester', target: 'Lillian', type: 'A' },
      { source: 'Sylvester', target: 'Mary', type: 'A' },
      { source: 'Sylvester', target: 'Jamie', type: 'A' },
      { source: 'Sylvester', target: 'Jessie', type: 'A' },
      { source: 'Sylvester', target: 'Helen', type: 'A' },
      { source: 'Helen', target: 'Gordon', type: 'A' },
      { source: 'Mary', target: 'Lillian', type: 'A' },
      { source: 'Ashton', target: 'Mary', type: 'A' },
      { source: 'Duncan', target: 'Jamie', type: 'A' },
      { source: 'Gordon', target: 'Jessie', type: 'A' },
      { source: 'Sylvester', target: 'Fray', type: 'E' },
      { source: 'Fray', target: 'Mauer', type: 'A' },
      { source: 'Fray', target: 'Cynthia', type: 'A' },
      { source: 'Fray', target: 'Percy', type: 'A' },
      { source: 'Percy', target: 'Cynthia', type: 'A' },
      { source: 'Infante', target: 'Duke', type: 'A' },
      { source: 'Duke', target: 'Gordon', type: 'A' },
      { source: 'Duke', target: 'Sylvester', type: 'A' },
      { source: 'Baron', target: 'Duke', type: 'A' },
      { source: 'Baron', target: 'Sylvester', type: 'E' },
      { source: 'Evette', target: 'Sylvester', type: 'E' },
      { source: 'Cynthia', target: 'Sylvester', type: 'E' },
      { source: 'Cynthia', target: 'Jamie', type: 'E' },
      { source: 'Mauer', target: 'Jessie', type: 'E' }
    ];

    const simulation = d3.forceSimulation().nodes(nodesData);

    simulation
      .force('charge_force', d3.forceManyBody())
      .force('center_force', d3.forceCenter(width / 2, height / 2));

    const node = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(nodesData)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', this.circleColor);

    simulation.on('tick', tickAction);

    function tickAction() {
      node
        .attr('cx', (d) => {
          return d.x;
        })
        .attr('cy', (d) => {
          return d.y;
        });

      link
        .attr('x1', (d) => {
          return d.source.x;
        })
        .attr('y1', (d) => {
          return d.source.y;
        })
        .attr('x2', (d) => {
          return d.target.x;
        })
        .attr('y2', (d) => {
          return d.target.y;
        });
    }

    const linkForce = d3.forceLink(linksData).id((d) => {
      return d.name;
    });

    simulation.force('links', linkForce);

    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(linksData)
      .enter()
      .append('line')
      .attr('stroke-width', 2)
      .style('stroke', this.linkColor);
  },
  methods: {
    circleColor(d) {
      if (d.sex === 'M') {
        return 'blue';
      } else {
        return 'pink';
      }
    },
    linkColor(d) {
      if (d.type === 'A') {
        return 'green';
      } else {
        return 'red';
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
