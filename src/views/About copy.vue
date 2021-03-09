<template>
  <div class="main">
    <draggable
      class="left"
      v-model="arr1"
      chosen-class="chosen"
      force-fallback="true"
      group="people"
      animation="1000"
      @start="onStart"
      @end="onEnd"
    >
      <transition-group>
        <div class="item" v-for="item in arr1" :key="item.id">
          {{ item.name }}
        </div>
      </transition-group>
    </draggable>
    <div id="container" class="container"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6';
import draggable from 'vuedraggable';
export default {
  components: { draggable },
  data() {
    return {
      arr1: [
        { people: 'cn', id: 1, name: 'table' },
        { people: 'cn', id: 2, name: 'user' },
        { people: 'cn', id: 3, name: 'data' },
        { people: 'us', id: 4, name: 'report' }
      ],
      arr2: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const data = {
        nodes: [
          {
            id: 'rect',
            label: 'rect',
            x: 250,
            y: 150,
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
              [0.5, 0],
              [0.5, 1]
            ]
          },
          {
            id: 'rect1',
            label: 'rect2',
            x: 450,
            y: 150,
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
              [0.5, 0],
              [0.5, 1]
            ]
          }
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            // 该边连入 source 点的第 0 个 anchorPoint，
            sourceAnchor: 0,
            // 该边连入 target 点的第 0 个 anchorPoint，
            targetAnchor: 0,
            style: {
              endArrow: true
            }
          },
          {
            source: 'node2',
            target: 'node1',
            // 该边连入 source 点的第 1 个 anchorPoint，
            sourceAnchor: 1,
            // 该边连入 source 点的第 1 个 anchorPoint，
            targetAnchor: 1,
            style: {
              endArrow: true
            }
          }
        ]
      };

      const width = document.getElementById('container').scrollWidth;
      const height = document.getElementById('container').scrollHeight || 500;
      const graph = new G6.Graph({
        container: 'container',
        width,
        height,
        // translate the graph to align the canvas's center, support by v3.5.1
        fitCenter: true,
        modes: {
          default: ['drag-canvas', 'drag-node']
        },
        defaultNode: {
          /* node type */
          type: 'rect',
          /* node size */
          size: [80, 40],
          labelCfg: {
            /* label's position, options: center, top, bottom, left, right */
            position: 'center'
          },
          /* configurations for four linkpoints */
          linkPoints: {
            top: true,
            right: true,
            bottom: true,
            left: true
          },
          /* icon configuration */
          icon: {
            /* whether show the icon, false by default */
            show: true
          }
        }
      });

      graph.data(data);
      graph.render();
      graph.on('node:mouseenter', (evt) => {
        console.log(evt, 'mouseenter');
        const { item } = evt;
        graph.setItemState(item, 'active', true);
      });

      graph.on('node:mouseleave', (evt) => {
        console.log(evt, 'mouseleave');
        const { item } = evt;
        graph.setItemState(item, 'active', false);
      });

      graph.on('node:click', (evt) => {
        console.log(evt, 'node:click');
        const { item } = evt;
        graph.setItemState(item, 'selected', true);
      });

      graph.on('canvas:click', (evt) => {
        console.log(evt, 'canvas:click');
        graph.getNodes().forEach((node) => {
          graph.clearItemStates(node);
        });
      });
    },
    onStart() {},
    onEnd() {}
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  margin: 50px auto;
  min-height: 500px;
  .left {
    border: 1px solid #eee;
    margin-right: 20px;
    padding: 10px;
    .item {
      background-color: #f1f1f1;
      cursor: move;
      width: 100px;
      height: 30px;
      line-height: 30px;
      margin-top: 5px;
    }
  }
  .container {
    border: 1px solid #eee;
    width: 500px;
  }
}
</style>
