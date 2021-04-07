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
      arr2: [],
      data: {
        nodes: [
          {
            id: 'rect1',
            label: 'rect1',
            type: 'rect',
            size: [80, 40],
            x: 250,
            y: 150,
            linkPoints: {
              top: true },
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
              [0.5, 0],
              [0.5, 1]
            ]
          },
          {
            id: 'rect2',
            label: 'rect2',
            type: 'rect',
            size: [80, 40],
            x: 450,
            y: 150,
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
              [0.5, 0],
              [0.5, 1]
            ]
          },
          {
            id: 'rect4',
            label: 'rect4',
            type: 'rect',
            size: [80, 40],
            x: 650,
            y: 150,
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
              [0.5, 0],
              [0.5, 1]
            ]
          },
          {
            id: 'rect3',
            label: 'rect3',
            x: 450,
            type: 'rect',
            size: [80, 40],
            y: 350,
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
              [0.5, 0],
              [0.5, 1]
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.init();
    console.log(G6.registerEdge(), 9);
  },
  methods: {
    init() {
      console.log(G6, 6);

      const width = document.getElementById('container').scrollWidth;
      const height = document.getElementById('container').scrollHeight || 500;
      const graph = new G6.Graph({
        container: 'container',
        width,
        height,
        // translate the graph to align the canvas's center, support by v3.5.1
        fitCenter: true,
        nodeStateStyles: {
          // 各状态下的样式，平铺的配置项仅在 keyShape 上生效。需要在其他 shape 样式上响应状态变化则写法不同，参见上文提到的 配置状态样式 链接
          hover: {
            fillOpacity: 0.1,
            lineWidth: 10
          }
        },
        modes: {
          default: ['drag-canvas', 'drag-node', 'zoom-canvas', {
            type: 'create-edge',
            trigger: 'drag' // 'click' by default. options: 'drag', 'click'
          }]
        },
        // defaultNode: {
        //   /* node type */
        //   type: 'rect',
        //   /* node size */
        //   size: [80, 40],
        //   labelCfg: {
        //     /* label's position, options: center, top, bottom, left, right */
        //     position: 'center'
        //   },
        //   /* configurations for four linkpoints */
        //   // linkPoints: {
        //   //   top: true,
        //   //   right: true,
        //   //   bottom: true,
        //   //   left: true
        //   // },
        //   /* icon configuration */
        //   icon: {
        //     /* whether show the icon, false by default */
        //     show: true
        //   }
        // },
        defaultEdge: {
          type: 'mid-point-edge',
          style: {
            stroke: 'red',
            lineWidth: 2
          }
        }
      });
      G6.registerEdge(
        'mid-point-edge',
        {
          afterDraw(cfg, group) {
            // 获取图形组中的第一个图形，在这里就是边的路径图形
            const shape = group.get('children')[0];
            // 获取路径图形的中点坐标
            const midPoint = shape.getPoint(0.5);
            // 在中点增加一个矩形，注意矩形的原点在其左上角
            group.addShape('circle', {
              attrs: {
                r: 10,
                fill: '#fff',
                stroke: '#666',
                cursor: 'pointer',
                // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
                x: midPoint.x,
                y: midPoint.y
              }
            });
          },
          update: undefined
        },
        'cubic'
      );

      // 点击时选中，再点击时取消
      graph.on('edge:click', (ev) => {
        console.log('click', ev.target, 9);
        if (ev.target.cfg.type === 'circle') {
          alert('配置关联关系');
        }
        // const edge = ev.item;
        // graph.setItemState(edge, 'selected', !edge.hasState('selected')); // 切换选中
      });
      graph.on('aftercreateedge', (e) => {
        // const edges = graph.save().edges;
        console.log(edges, 123);
        // G6.Util.processParallelEdges(edges);
        // graph.getEdges().forEach((edge, i) => {
        //   graph.updateItem(edge, {
        //     curveOffset: edges[i].curveOffset,
        //     curvePosition: edges[i].curvePosition
        //   });
        // });
      });
      graph.on('edge:mouseenter', (ev) => {
        // const edge = ev.item;
        // graph.setItemState(edge, 'active', true);
      });

      graph.on('edge:mouseleave', (ev) => {
        // const edge = ev.item;
        // debugger;
        // graph.setItemState(edge, 'active', false);
      });
      graph.on('node:mouseenter', (evt) => {
        const node = evt.item;
        // 激活该节点的 hover 状态
        graph.setItemState(node, 'hover', true);
      });

      graph.on('node:mouseleave', (evt) => {
        const node = evt.item;
        // 关闭该节点的 hover 状态
        graph.setItemState(node, 'hover', false);
      });

      graph.on('node:click', (evt) => {
        console.log(evt, 'node:click');

        // const { item } = evt;
        // graph.setItemState(item, 'selected', true);
      });
      graph.on('node:dragstart', (evt) => {
        console.log(evt, 11);
      });
      graph.on('canvas:click', (evt) => {
        console.log(evt, 'canvas:click');
        console.log(evt.target);
        graph.getNodes().forEach((node) => {
          graph.clearItemStates(node);
        });
      });
      graph.data(this.data);
      graph.render();
    },
    onStart() {},
    onEnd(e) {
      console.log(e, 91);
    }
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
