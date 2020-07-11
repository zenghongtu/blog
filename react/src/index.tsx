// const App = () => {
//   return <div>hello world</div>;
// };

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      sum: 0,
    };
    this.add = this.add.bind(this);
  }

  add() {
    this.setState({ sum: 3 });
    this.setState({ sum: 4 });
    this.setState({ sum: 5 });
  }

  render() {
    return <div onClick={this.add}>{this.state.sum}</div>;
  }
}

// @ts-ignore
ReactDOM.render(<App></App>, document.querySelector("#app"));
// ReactDOM.createRoot(document.querySelector("#app")).render(<App></App>);
