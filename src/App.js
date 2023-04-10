import React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkImg from 'remark-images'
import remarkImgageLinks from '@pondorasti/remark-img-links';
import remarkMath from 'remark-math'
import remarkMermaid from 'remark-mermaidjs'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css'
import './index.css';


class MarkdownPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      content: null
    };
  }

  componentDidMount(){
    const {pathname} = window.location;
    if (pathname == '/'){
      return window.location.assign("/md/index.md")
    }

    fetch(`/assets/${pathname}`, {method: 'GET'})
      .then(resp => resp.text())
      .then(content => this.setState({content}))
      .catch(error => console.error(error));
  }

  remarkImgLinks = opts => remarkImgageLinks({absolutePath: `${window.location.protocol}//${window.location.host}/assets${window.location.pathname}`, ...opts})

  render(){
    const { content } = this.state;
    return (
      content ? (
        <center>
          <ReactMarkdown
            children={content}
            remarkPlugins={[remarkGfm, remarkImg, this.remarkImgLinks, remarkMath, remarkMermaid]}
            rehypePlugins={[rehypeKatex]}
            className="main-page"
          />
        </center>
      ) : (
        <div>no content</div>
      )
    )
  }
}


export default class App extends React.Component{
  render(){
    return (
      <MarkdownPage />
    )
  }
}
