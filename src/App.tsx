import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import avatar from "./images/winnie.png";
import axios from "axios";

interface CommentItem {
  rpid: string;
  user: User;
  content: string;
  ctime: string;
  like: number;
}

interface User {
  uid: string;
  avatar: string;
  uname: string;
}

// 当前登录用户信息
const user = {
  // 用户id
  uid: "30009257",
  // 用户头像
  avatar,
  // 用户昵称
  uname: "黑马前端",
};
/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */
// 导航 Tab 数组
/**
 * 点击谁就把谁的 type_id 记录下来, 然后和遍历时每一项的 type 匹配.
 */
const tabs = [
  { type: "hot", text: "最热" },
  { type: "time", text: "最新" },
];

function getCurrentTime(): string {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${month}-${day} ${hours}:${minutes}`;
}

function useGetList() {
  /**
   * 评论列表的渲染和操作
   *
   * 1. 根据状态渲染评论列表
   * 2. 删除评论
   */

  /**
   * 评论列表数据:
   * 1. 使用 useState 维护评论列表.
   * 2. 只有自己的评论才能被删除, 删除后列表不再显示.
   */
  const defaultList = [
    {
      // 评论id
      rpid: "3",
      // 用户信息
      user: {
        uid: "13258165",
        avatar,
        uname: "周杰伦",
      },
      // 评论内容
      content: "哎哟，不错哦",
      // 评论时间
      ctime: "10-18 08:15",
      like: 88,
    },
    {
      rpid: "2",
      user: {
        uid: "36080105",
        avatar,
        uname: "许嵩",
      },
      content: "我寻你千百度 日出到迟暮",
      ctime: "11-13 11:29",
      like: 88,
    },
    {
      rpid: "1",
      user: {
        uid: "30009257",
        avatar,
        uname: "黑马前端",
      },
      content: "学前端就来黑马",
      ctime: "10-19 09:00",
      like: 66,
    },
  ];
  const [commentList, setCommentList] = useState(defaultList);
  return {
    commentList,
    setCommentList,
    defaultList,
  };
}

// 封装一个 item 组件
function Item({ item, handleDel }: { item: CommentItem; handleDel: Function }) {
  return (
    <div className="reply-item">
      {/* 头像 */}
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img className="bili-avatar-img" alt="" src={item.user?.avatar} />
        </div>
      </div>
      <div className="content-wrap">
        {/* 用户名 */}
        <div className="user-info">
          <div className="user-name">{item.user?.uname}</div>
        </div>
        {/* 评论内容 */}
        <div className="root-reply">
          <span className="reply-content">{item.content}</span>
          <div className="reply-info">
            {/* 评论时间 */}
            <span className="reply-time">{item.ctime}</span>
            {/* 评论数量 */}
            <span className="reply-time">点赞数:{item.like}</span>
            {/* 通过 user.id == item.user.id */}
            {user.uid === item.user?.uid && (
              <span
                className="delete-btn"
                onClick={() => {
                  handleDel(item.rpid as string);
                }}
              >
                删除
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  // useEffect(() => {
  //   // 通过API请求数据.
  //   async function getList() {
  //     // axios 请求数据.
  //     const res = await axios.get("http://localhost:3000/0");
  //     setCommentList(res.data);
  //   }
  //   getList();
  // }, []);
  const { defaultList, setCommentList, commentList } = useGetList();
  const [currentType, setCurrentType] = useState("hot");
  const commentTextRef = useRef<HTMLTextAreaElement>(null);
  // 发布评论功能
  const submitCommentText = () => {
    if (!commentTextRef.current) throw Error("commentTextRef was not assigned");
    const newRpid = uuidv4();
    const newComment = {
      rpid: newRpid,
      user: {
        uid: "30009257",
        avatar,
        uname: "黑马前端",
      },
      content: commentTextRef.current.value,
      ctime: getCurrentTime(),
      like: 0,
    };
    console.log(newComment.rpid);
    setCommentList([...commentList, newComment]);
    commentTextRef.current.value = "";
    commentTextRef.current.focus();
  };
  // 删除评论功能
  const handleDel = (id: string) => {
    setCommentList(commentList.filter((item) => item.rpid !== id));
  };

  const handleClick = (type: string, e: Event) => {
    type === "hot" ? setCurrentType("hot") : setCurrentType("time");
    if (type === "time") {
      setCommentList(
        commentList.sort((a: Partial<(typeof defaultList)[0]>, b: Partial<(typeof defaultList)[0]>) => {
          const [monthA, dayA, timeA] = a.ctime!.split(/[- :]/);
          const [monthB, dayB, timeB] = b.ctime!.split(/[- :]/);

          const dateA = new Date(2023, parseInt(monthA) - 1, parseInt(dayA), ...timeA.split(":").map(Number));
          const dateB = new Date(2023, parseInt(monthB) - 1, parseInt(dayB), ...timeB.split(":").map(Number));

          return dateB.getTime() - dateA.getTime();
        })
      );
    } else {
      setCommentList(
        commentList.sort((a: Partial<(typeof defaultList)[0]>, b: Partial<(typeof defaultList)[0]>) => {
          return b.like! - a.like!;
        })
      );
    }
  };

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map((item) => (
              <span
                key={item.type}
                className={`nav-item ${(currentType as string) === item.type && "nav-after-click"}`}
                onClick={(e) => {
                  handleClick(item.type as string, e as unknown as Event);
                }}
              >
                {item.text}
              </span>
            ))}
          </li>
        </ul>
      </div>
      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea ref={commentTextRef} className="reply-box-textarea" placeholder="发一条友善的评论" />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text" onClick={submitCommentText}>
                发布
              </div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {commentList.map((item: CommentItem) => (
            <Item key={item?.rpid} item={item} handleDel={handleDel} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
