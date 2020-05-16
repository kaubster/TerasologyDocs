const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const Container = CompLibrary.Container;

class IFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
    };
  }

  componentDidMount() {
    const height = document.getElementById("postContainer").clientHeight;
    this.setState({ height });
    console.log(height);
  }

  renderHTMLFrame() {
    return (
      <iframe
        ref="iframe"
        src={this.props.url}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }

  render() {
    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          {this.renderHTMLFrame()}
        </Container>
      </div>
    );
  }
}

class TerasologyDocsIFrame extends React.Component {
  render() {
    return (
      <div>
        <IFrame
          url="https://metaterasology.github.io/docs/index.html"
          width="100%"
          height="2000px"
        />
      </div>
    );
  }
}

module.exports = TerasologyDocsIFrame;
