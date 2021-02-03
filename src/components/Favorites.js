import React from 'react';
import { Menu, Button, Drawer, message } from 'antd';
import { EyeOutlined, YoutubeOutlined, VideoCameraOutlined, StarFilled } from '@ant-design/icons';
import { deleteFavoriteItem } from '../utils';

const { SubMenu } = Menu;
const MenuKey = {
  Streams: 'streams',
  Videos: 'videos',
  Clips: 'clips'
}

const processUrl = (url) => url
  .replace('%{height}', '252')
  .replace('%{width}', '480')
  .replace('{height}', '252')
  .replace('{width}', '480');

const renderMenuItem = (favs, item, favOnChange) => {
  const favOnClick = () => {
      deleteFavoriteItem(item).then(() => {
        favOnChange();
      }).catch(err => {
        message.error(err.message)
      })
      return;
  }
 
  return (
    <>
        <Menu.Item>
          <img 
            alt="Placeholder"
            src={processUrl(item.thumbnail_url)}
            style={{height: '100%'}}
          />
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            Go to Twitch
          </a>
        </Menu.Item>
        <Menu.Item>
            <Button shape="circle" icon={<StarFilled /> } onClick={favOnClick}/>
            <span>Remove From Favorites</span>
        </Menu.Item>
    </>
  )
}

class Favorites extends React.Component {
  state = {
    displayDrawer: false,
  }
 
  onDrawerClose = () => {
    this.setState({
      displayDrawer: false,
    })
  }
 
  onFavoriteClick = () => {
    this.setState({
      displayDrawer: true,
    })
  }

  render = () => {
    const { VIDEO, STREAM, CLIP } = this.props.data;
    const favoriteOnChange = this.props.favoriteOnChange;

    return (
      <>
        <Button type="primary" shape="round" onClick={this.onFavoriteClick} icon={<StarFilled />}>
          My Favorites</Button>
        <Drawer
          title="My Favorites"
          placement="right"
          width={720}
          visible={this.state.displayDrawer}
          onClose={this.onDrawerClose}
        >
          <Menu
            mode="inline"
            defaultOpenKeys={[MenuKey.Streams]}
            style={{ height: '100%', borderRight: 0 }}
            selectable={false}
          >
            <SubMenu key={MenuKey.Streams} icon={<EyeOutlined />} title="Streams">
              {
                STREAM.map((item) => {
                  const title = `${item.broadcaster_name} - ${item.title}`;
                  return (
                    <SubMenu key={item.id} title={title}>
                        {renderMenuItem(STREAM, item, favoriteOnChange)}
                    </SubMenu>
                  )
                })
              }
            </SubMenu>
            <SubMenu key={MenuKey.Videos} icon={<YoutubeOutlined />} title="Videos">
              {
                VIDEO.map((item) => {
                  const title = `${item.broadcaster_name} - ${item.title}`;
                  return (
                    <SubMenu key={item.id} title={title}>
                        {renderMenuItem(VIDEO, item, favoriteOnChange)}
                    </SubMenu>
                  )
                })
              }
            </SubMenu>
            <SubMenu key={MenuKey.Clips} icon={<VideoCameraOutlined />} title="Clips">
              {
                CLIP.map((item) => {
                  const title = `${item.broadcaster_name} - ${item.title}`;
                  return (
                    <SubMenu key={item.id} title={title}>
                        {renderMenuItem(CLIP, item, favoriteOnChange)}
                    </SubMenu>
                  )
                })
              }
            </SubMenu>
          </Menu>
        </Drawer>
      </>
    )
  }
}
 
export default Favorites;