import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Resizable, ResizableBox } from 'react-resizable';

// fake data generator
// @ts-ignore
const getItems = count =>
  // @ts-ignore
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    //content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  console.log(result, "RESULT!!!!")
  return result;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 0,
  margin: 0,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});
// @ts-ignore
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

export default class testTable extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      items: getItems(6),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result: any) {
    // dropped outside the list
    console.log(result, "TESTING!!!!")
    if (!result.destination) {
      return;
    }

    const items = reorder(
      // @ts-ignore
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    // @ts-ignore
    console.log(5, 'RENDER')
    return (
      <div
        className="content-wrapper"
        style={{
          position: 'relative'
        }}
        onClick={() =>
          document.getElementById('mainDrawer')?.classList.remove('open')
        }
      >
        <div className="content">

          <div className="widgets-top">
            <div className="option-buttons">
              <button className="button">Charts</button>
              <button className="button active">Text</button>
            </div>
          </div>

          <div className="content-card">
            <div className="team-table-wrapper">

              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                  {(provided, snapshot) => (
                    <div className="team-table"
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                    >
                      {/* @ts-ignore */}
                      {this.state.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}

                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )} className="team-table-column"
                            >
                              {item.id === 'item-0' && (
                                <>
                                  <div className="team-table-column-header" {...provided.dragHandleProps}>
                                    <div className="team-table-column-header-item">
                                      <p className="team-table-column-header-item-text">
                                        Team member
            </p>
                                    </div>
                                  </div>
                                  <div className="team-table-column-body">
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-img-wrapper">
                                        <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
                                      </div>
                                      <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
              Developer
            </p>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-img-wrapper">
                                        <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
                                      </div>
                                      <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
              Developer
            </p>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-img-wrapper">
                                        <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
                                      </div>
                                      <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
              Developer
            </p>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-img-wrapper">
                                        <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
                                      </div>
                                      <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
              Developer
            </p>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-img-wrapper">
                                        <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
                                      </div>
                                      <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
              Developer
            </p>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-img-wrapper">
                                        <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
                                      </div>
                                      <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
              Developer
            </p>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-img-wrapper">
                                        <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
                                      </div>
                                      <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
              Developer
            </p>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-img-wrapper">
                                        <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
                                      </div>
                                      <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
              Developer
            </p>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-img-wrapper">
                                        <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
                                      </div>
                                      <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
              Developer
            </p>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-img-wrapper">
                                        <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
                                      </div>
                                      <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
              Developer
            </p>
                                    </div>
                                  </div>
                                </>
                              )}

                              {item.id === 'item-1' && (
                                <>
                                  <div className="team-table-column-header" {...provided.dragHandleProps}>
                                    <div className="team-table-column-header-item">
                                      <p className="team-table-column-header-item-text">
                                        Attitude
            </p>
                                    </div>
                                  </div>
                                  <div className="team-table-column-body">
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-button green">Good</div>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-button red">Weak</div>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-button yellow">Ok</div>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-button green">Good</div>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-button green">Good</div>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-button green">Good</div>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-button green">Good</div>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-button green">Good</div>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-button green">Good</div>
                                    </div>
                                    <div className="team-table-column-body-item">
                                      <div className="team-table-column-body-item-button green">Good</div>
                                    </div>
                                  </div>
                                </>
                              )}

                              {
                                item.id === 'item-2' && (
                                  <>
                                    <div className="team-table-column-header" {...provided.dragHandleProps}>
                                      <div className="team-table-column-header-item">
                                        <p className="team-table-column-header-item-text">
                                          Productivity
            </p>
                                      </div>
                                    </div>
                                    <div className="team-table-column-body">
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button red">Weak</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button yellow">Ok</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                    </div>
                                  </>
                                )
                              }

                              {
                                item.id === 'item-3' && (
                                  <>
                                    <div className="team-table-column-header" {...provided.dragHandleProps}>
                                      <div className="team-table-column-header-item">
                                        <p className="team-table-column-header-item-text">
                                          Teamworking
            </p>
                                      </div>
                                    </div>
                                    <div className="team-table-column-body">
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button red">Weak</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button yellow">Ok</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-button green">Good</div>
                                      </div>
                                    </div>
                                  </>
                                )
                              }

                              {
                                item.id === 'item-4' && (
                                  <>
                                    <div className="team-table-column-header" {...provided.dragHandleProps}>
                                      <div className="team-table-column-header-item">
                                        <p className="team-table-column-header-item-text">
                                          Average feedback
            </p>
                                      </div>
                                    </div>
                                    <div className="team-table-column-body">
                                      <div className="team-table-column-body-item">
                                        <div className="stars">
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star">
                                            <i className="icon-star"></i>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="stars">
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star">
                                            <i className="icon-star"></i>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="stars">
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star">
                                            <i className="icon-star"></i>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="stars">
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star">
                                            <i className="icon-star"></i>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="stars">
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star">
                                            <i className="icon-star"></i>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="stars">
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star">
                                            <i className="icon-star"></i>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="stars">
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star">
                                            <i className="icon-star"></i>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="stars">
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star">
                                            <i className="icon-star"></i>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="stars">
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star">
                                            <i className="icon-star"></i>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="stars">
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star full">
                                            <i className="icon-star"></i>
                                          </div>
                                          <div className="star">
                                            <i className="icon-star"></i>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )
                              }

                              {
                                item.id === 'item-5' && (
                                  <>
                                    <div className="team-table-column-header" {...provided.dragHandleProps}>
                                      <div className="team-table-column-header-item">
                                        <p className="team-table-column-header-item-text">
                                          Amount of given feedback
            </p>
                                      </div>
                                    </div>
                                    <div className="team-table-column-body">
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-progress-wrapper">
                                          <div className="team-table-column-body-item-progress">
                                            <div className="team-table-column-body-item-progress-bar green">
                                              <p className="team-table-column-body-item-progress-bar-label">12</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-progress-wrapper">
                                          <div className="team-table-column-body-item-progress">
                                            <div className="team-table-column-body-item-progress-bar red">
                                              <p className="team-table-column-body-item-progress-bar-label">12</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-progress-wrapper">
                                          <div className="team-table-column-body-item-progress">
                                            <div className="team-table-column-body-item-progress-bar yellow">
                                              <p className="team-table-column-body-item-progress-bar-label">12</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-progress-wrapper">
                                          <div className="team-table-column-body-item-progress">
                                            <div className="team-table-column-body-item-progress-bar green">
                                              <p className="team-table-column-body-item-progress-bar-label">12</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-progress-wrapper">
                                          <div className="team-table-column-body-item-progress">
                                            <div className="team-table-column-body-item-progress-bar green">
                                              <p className="team-table-column-body-item-progress-bar-label">12</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-progress-wrapper">
                                          <div className="team-table-column-body-item-progress">
                                            <div className="team-table-column-body-item-progress-bar green">
                                              <p className="team-table-column-body-item-progress-bar-label">12</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-progress-wrapper">
                                          <div className="team-table-column-body-item-progress">
                                            <div className="team-table-column-body-item-progress-bar green">
                                              <p className="team-table-column-body-item-progress-bar-label">12</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-progress-wrapper">
                                          <div className="team-table-column-body-item-progress">
                                            <div className="team-table-column-body-item-progress-bar green">
                                              <p className="team-table-column-body-item-progress-bar-label">12</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-progress-wrapper">
                                          <div className="team-table-column-body-item-progress">
                                            <div className="team-table-column-body-item-progress-bar green">
                                              <p className="team-table-column-body-item-progress-bar-label">12</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="team-table-column-body-item">
                                        <div className="team-table-column-body-item-progress-wrapper">
                                          <div className="team-table-column-body-item-progress">
                                            <div className="team-table-column-body-item-progress-bar green">
                                              <p className="team-table-column-body-item-progress-bar-label">12</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )
                              }
                            </div>
                          )}
                        </Draggable>
                      ))}



                      {/* {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={0ndex}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))} */}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

            </div>
          </div>

        </div>

      </div >















    );
  }
}

// import React, { useState } from 'react'
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
//   const custom: any = {
//     id: `id-${k}`,
//     content: `Quote ${k}`
//   };

//   return custom;
// });

// const grid = 8;
// const reorder = (list: any, startIndex: any, endIndex: any) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// function testTable() {
//   const [state, setState] = useState({ quotes: initial });

//   function onDragEnd(result: any) {
//     if (!result.destination) {
//       return;
//     }

//     if (result.destination.index === result.source.index) {
//       return;
//     }

//     const quotes = reorder(
//       state.quotes,
//       result.source.index,
//       result.destination.index
//     );

//     setState({ quotes });
//   }

//   return (
//     <div
//       className="content-wrapper"
//       style={{
//         position: 'relative'
//       }}
//       onClick={() =>
//         document.getElementById('mainDrawer')?.classList.remove('open')
//       }
//     >
//       <div className="content">

//         <div className="widgets-top">
//           <div className="option-buttons">
//             <button className="button">Charts</button>
//             <button className="button active">Text</button>
//           </div>
//         </div>

//         <div className="content-card">
//           <div className="team-table-wrapper">

//             <div className="team-table">
            //   <div className="team-table-column">
            //     <div className="team-table-column-header" {...provided.dragHandleProps}>
            //       <div className="team-table-column-header-item">
            //         <p className="team-table-column-header-item-text">
            //           Team member
            // </p>
            //       </div>
            //     </div>
            //     <div className="team-table-column-body">
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-img-wrapper">
            //           <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
            //         </div>
            //         <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
            //   Developer
            // </p>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-img-wrapper">
            //           <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
            //         </div>
            //         <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
            //   Developer
            // </p>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-img-wrapper">
            //           <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
            //         </div>
            //         <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
            //   Developer
            // </p>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-img-wrapper">
            //           <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
            //         </div>
            //         <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
            //   Developer
            // </p>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-img-wrapper">
            //           <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
            //         </div>
            //         <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
            //   Developer
            // </p>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-img-wrapper">
            //           <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
            //         </div>
            //         <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
            //   Developer
            // </p>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-img-wrapper">
            //           <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
            //         </div>
            //         <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
            //   Developer
            // </p>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-img-wrapper">
            //           <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
            //         </div>
            //         <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
            //   Developer
            // </p>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-img-wrapper">
            //           <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
            //         </div>
            //         <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
            //   Developer
            // </p>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-img-wrapper">
            //           <img src="/img/p-01.png" alt="User" className="team-table-column-body-item-img" />
            //         </div>
            //         <p className="team-table-column-body-item-text"><span>Gregory Porter</span>&nbsp;- Senior Python
            //   Developer
            // </p>
            //       </div>
            //     </div>
            //   </div>

            //   <div className="team-table-column">
            //     <div className="team-table-column-header" {...provided.dragHandleProps}>
            //       <div className="team-table-column-header-item">
            //         <p className="team-table-column-header-item-text">
            //           Attitude
            // </p>
            //       </div>
            //     </div>
            //     <div className="team-table-column-body">
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button red">Weak</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button yellow">Ok</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //     </div>
            //   </div>

//               <div className="team-table-column">
            //     <div className="team-table-column-header" {...provided.dragHandleProps}>
            //       <div className="team-table-column-header-item">
            //         <p className="team-table-column-header-item-text">
            //           Productivity
            // </p>
            //       </div>
            //     </div>
            //     <div className="team-table-column-body">
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button red">Weak</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button yellow">Ok</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //     </div>
//               </div>

//               <div className="team-table-column">
            //     <div className="team-table-column-header" {...provided.dragHandleProps}>
            //       <div className="team-table-column-header-item">
            //         <p className="team-table-column-header-item-text">
            //           Teamworking
            // </p>
            //       </div>
            //     </div>
            //     <div className="team-table-column-body">
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button red">Weak</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button yellow">Ok</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-button green">Good</div>
            //       </div>
            //     </div>
//               </div>

//               <div className="team-table-column">
            //     <div className="team-table-column-header" {...provided.dragHandleProps}>
            //       <div className="team-table-column-header-item">
            //         <p className="team-table-column-header-item-text">
            //           Average feedback
            // </p>
            //       </div>
            //     </div>
            //     <div className="team-table-column-body">
            //       <div className="team-table-column-body-item">
            //         <div className="stars">
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star">
            //             <i className="icon-star"></i>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="stars">
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star">
            //             <i className="icon-star"></i>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="stars">
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star">
            //             <i className="icon-star"></i>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="stars">
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star">
            //             <i className="icon-star"></i>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="stars">
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star">
            //             <i className="icon-star"></i>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="stars">
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star">
            //             <i className="icon-star"></i>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="stars">
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star">
            //             <i className="icon-star"></i>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="stars">
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star">
            //             <i className="icon-star"></i>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="stars">
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star">
            //             <i className="icon-star"></i>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="stars">
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star full">
            //             <i className="icon-star"></i>
            //           </div>
            //           <div className="star">
            //             <i className="icon-star"></i>
            //           </div>
            //         </div>
            //       </div>
            //     </div>
//               </div>

//               <div className="team-table-column">
            //     <div className="team-table-column-header" {...provided.dragHandleProps}>
            //       <div className="team-table-column-header-item">
            //         <p className="team-table-column-header-item-text">
            //           Amount of given feedback
            // </p>
            //       </div>
            //     </div>
            //     <div className="team-table-column-body">
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-progress-wrapper">
            //           <div className="team-table-column-body-item-progress">
            //             <div className="team-table-column-body-item-progress-bar green">
            //               <p className="team-table-column-body-item-progress-bar-label">12</p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-progress-wrapper">
            //           <div className="team-table-column-body-item-progress">
            //             <div className="team-table-column-body-item-progress-bar red">
            //               <p className="team-table-column-body-item-progress-bar-label">12</p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-progress-wrapper">
            //           <div className="team-table-column-body-item-progress">
            //             <div className="team-table-column-body-item-progress-bar yellow">
            //               <p className="team-table-column-body-item-progress-bar-label">12</p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-progress-wrapper">
            //           <div className="team-table-column-body-item-progress">
            //             <div className="team-table-column-body-item-progress-bar green">
            //               <p className="team-table-column-body-item-progress-bar-label">12</p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-progress-wrapper">
            //           <div className="team-table-column-body-item-progress">
            //             <div className="team-table-column-body-item-progress-bar green">
            //               <p className="team-table-column-body-item-progress-bar-label">12</p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-progress-wrapper">
            //           <div className="team-table-column-body-item-progress">
            //             <div className="team-table-column-body-item-progress-bar green">
            //               <p className="team-table-column-body-item-progress-bar-label">12</p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-progress-wrapper">
            //           <div className="team-table-column-body-item-progress">
            //             <div className="team-table-column-body-item-progress-bar green">
            //               <p className="team-table-column-body-item-progress-bar-label">12</p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-progress-wrapper">
            //           <div className="team-table-column-body-item-progress">
            //             <div className="team-table-column-body-item-progress-bar green">
            //               <p className="team-table-column-body-item-progress-bar-label">12</p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-progress-wrapper">
            //           <div className="team-table-column-body-item-progress">
            //             <div className="team-table-column-body-item-progress-bar green">
            //               <p className="team-table-column-body-item-progress-bar-label">12</p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //       <div className="team-table-column-body-item">
            //         <div className="team-table-column-body-item-progress-wrapper">
            //           <div className="team-table-column-body-item-progress">
            //             <div className="team-table-column-body-item-progress-bar green">
            //               <p className="team-table-column-body-item-progress-bar-label">12</p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //     </div>
//               </div>

//             </div>

//           </div>
//         </div>

//       </div>

//     </div >

//   );
// }

// export default testTable
