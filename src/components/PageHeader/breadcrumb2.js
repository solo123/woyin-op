/* eslint-disable no-unused-vars */
import React, { PureComponent, createElement } from 'react';
import pathToRegexp from 'path-to-regexp';
import { Breadcrumb, Button, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './index.less';
import { urlToList } from '../_utils/pathTools';

const ButtonGroup = Button.Group;
export const getBreadcrumb = (breadcrumbNameMap, url) => {
  let breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach(item => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  return breadcrumb || {};
};

export default class BreadcrumbView extends PureComponent {
  state = {
    breadcrumb: null,
    breadList: [
      { label: '商户列表', href: '/sss/sss' },
      { label: '商户列表', href: '/sss/sss' },
      { label: '商户列表', href: '/sss/sss' },
      { label: '商户列表', href: '/sss/sss' },
      { label: '商户列表', href: '/sss/sss' },
      { label: '商户列表', href: '/sss/sss' },
      { label: '商户列表', href: '/sss/sss' },
      { label: '商户列表', href: '/sss/sss' },
      { label: '商户列表', href: '/sss/sss' },
      { label: '商户列表', href: '/sss/sss' },
      { label: '商户列表', href: '/sss/sss' },
    ],
  };

  componentDidMount() {
    this.getBreadcrumbDom();
  }

  componentDidUpdate(preProps) {
    const { location } = this.props;
    if (!location || !preProps.location) {
      return;
    }
    const prePathname = preProps.location.pathname;
    if (prePathname !== location.pathname) {
      this.getBreadcrumbDom();
    }
  }

  getBreadcrumbDom = () => {
    const breadcrumb = this.conversionBreadcrumbList();
    this.setState({
      breadcrumb,
    });
  };

  getBreadcrumbProps = () => {
    const { routes, params, location, breadcrumbNameMap } = this.props;
    return {
      routes,
      params,
      routerLocation: location,
      breadcrumbNameMap,
    };
  };

  // Generated according to props
  conversionFromProps = () => {
    const { breadcrumbList, breadcrumbSeparator, itemRender, linkElement = 'a' } = this.props;
    return (
      <Breadcrumb className={styles.breadcrumb} separator={breadcrumbSeparator}>
        {breadcrumbList.map(item => {
          const title = itemRender ? itemRender(item) : item.title;
          return (
            <Breadcrumb.Item key={item.title}>
              {item.href
                ? createElement(
                    linkElement,
                    {
                      [linkElement === 'a' ? 'href' : 'to']: item.href,
                    },
                    title
                  )
                : title}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  };

  conversionFromLocation = (routerLocation, breadcrumbNameMap) => {
    const { breadcrumbSeparator, home, itemRender, linkElement = 'a' } = this.props;
    // Convert the url to an array
    const pathSnippets = urlToList(routerLocation.pathname);
    // Loop data mosaic routing
    const extraBreadcrumbItems = pathSnippets.map((url, index) => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      if (currentBreadcrumb.inherited) {
        return null;
      }
      const isLinkable = index !== pathSnippets.length - 1 && currentBreadcrumb.component;
      const name = itemRender ? itemRender(currentBreadcrumb) : currentBreadcrumb.name;
      return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
        <Breadcrumb.Item key={url}>
          {createElement(
            isLinkable ? linkElement : 'span',
            { [linkElement === 'a' ? 'href' : 'to']: url },
            name
          )}
        </Breadcrumb.Item>
      ) : null;
    });
    // Add home breadcrumbs to your head if defined
    if (home) {
      extraBreadcrumbItems.unshift(
        <Breadcrumb.Item key="home">
          {createElement(
            linkElement,
            {
              [linkElement === 'a' ? 'href' : 'to']: '/',
            },
            home
          )}
        </Breadcrumb.Item>
      );
    }
    return (
      <Breadcrumb className={styles.breadcrumb} separator={breadcrumbSeparator}>
        {extraBreadcrumbItems}
      </Breadcrumb>
    );
  };

  onClick = (e, href) => {
    // e.preventDefault();
    const { dispatch } = this.props;
    dispatch(
      routerRedux.push({
        pathname: href,
      })
    );
    console.log('产品多多');
  };

  onClose = (e, href) => {
    const { dispatch } = this.state;
  };

  /**
   * 将参数转化为面包屑
   * Convert parameters into breadcrumbs
   */
  conversionBreadcrumbList = () => {
    // console.log(this.props);
    const { breadList } = this.state;
    const { headMenu } = this.props;
    // console.log(headMenu);
    // const { breadcrumbList, breadcrumbSeparator } = this.props;
    // const { routes, params, routerLocation, breadcrumbNameMap } = this.getBreadcrumbProps();
    // if (breadcrumbList && breadcrumbList.length) {
    //   return this.conversionFromProps();
    // }
    // // 如果传入 routes 和 params 属性
    // // If pass routes and params attributes
    // if (routes && params) {
    //   return (
    //     <Breadcrumb
    //       className={styles.breadcrumb}
    //       routes={routes.filter(route => route.breadcrumbName)}
    //       params={params}
    //       itemRender={this.itemRender}
    //       separator={breadcrumbSeparator}
    //     />

    //   );
    // }
    // // 根据 location 生成 面包屑
    // // Generate breadcrumbs based on location
    // if (routerLocation && routerLocation.pathname) {
    //   return this.conversionFromLocation(routerLocation, breadcrumbNameMap);
    // }
    // href={elem.href}
    console.log(headMenu);
    return (
      <React.Fragment>
        {headMenu.map(elem => (
          <ButtonGroup key={elem.href}>
            <Button
              onClick={e => {
                this.onClick(e, elem.href);
              }}
            >
              {elem.label}
            </Button>
            <Button
              onClose={e => {
                this.onClose(e, elem.href);
              }}
              type="primary"
              icon="close"
            />
          </ButtonGroup>
        ))}
      </React.Fragment>
    );
  };

  // 渲染Breadcrumb 子节点
  // Render the Breadcrumb child node
  itemRender = (route, params, routes, paths) => {
    const { linkElement = 'a' } = this.props;
    const last = routes.indexOf(route) === routes.length - 1;
    return last || !route.component ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      createElement(
        linkElement,
        {
          href: paths.join('/') || '/',
          to: paths.join('/') || '/',
        },
        route.breadcrumbName
      )
    );
  };

  render() {
    const { breadcrumb } = this.state;
    return breadcrumb;
  }
}
