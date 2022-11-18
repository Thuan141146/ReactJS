import React, { Component } from 'react';
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './QLSK.scss';
import *  as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getdetailinfosukien } from '../../../services/danhmucService'
import Select from 'react-select';
import { has } from 'lodash';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class QLSK extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            mota: '',
            listsukien: [],
            hasOldData: false,


        }

    }
    componentDidMount() {
        this.props.fetchAllsukien()
    }

    buildDataInputSelect = (inputdata) => {
        let result = [];
        if (inputdata && inputdata.length > 0) {
            inputdata.map((item, index) => {
                let object = {};
                let labelvn = `${item.TEN_LSK}`;

                object.label = labelvn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allsukien !== this.props.allsukien) {
            let dataSelect = this.buildDataInputSelect(this.props.allsukien)
            this.setState({
                listsukien: dataSelect,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.CreateInfoSuKien({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            mota: this.state.mota,
            sukienid: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE

        })
        // console.log('b1809299 check state', this.state)
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await getdetailinfosukien(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                mota: markdown.mota,
                hasOldData: true,
            })

        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                mota: '',
                hasOldData: false,
            })
        }
    };
    handleOnChangMoTa = (event) => {
        this.setState({
            mota: event.target.value
        })

    }
    render() {
        let { hasOldData } = this.state;
        //console.log('b1809299 check', this.state)
        return (
            <div className="qlsk-container">
                <div className="qlsk-title">
                    THÔNG TIN CHI TIẾT SƯ KIỆN
                </div>
                <div className="more-info">
                    <div className="content-left form-group">

                        <label> Chọn sự kiện</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listsukien}
                        />
                    </div>
                    <div className="content-right">
                        <label>Thông tin giới thiệu</label>
                        <textarea className="form-control" rows="4"
                            onChange={(event) => this.handleOnChangMoTa(event)}
                            value={this.state.mota}
                        >

                            aaaaaa
                        </textarea>
                    </div>

                </div>
                <div className="qlsk-editor">
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />

                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? "save-qlsk" : "create-qlsk"}>
                    {
                        hasOldData === true ?
                            <span> cập nhật sự kiện</span> : <span> Lưu sự kiện</span>
                    }

                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allsukien: state.admin.allsukien

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllsukien: (id) => dispatch(actions.fetchAllsukien()),
        CreateInfoSuKien: (data) => dispatch(actions.CreateInfoSuKien(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QLSK);
