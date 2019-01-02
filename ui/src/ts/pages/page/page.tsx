import * as React from 'react'

import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

import { map } from 'lodash'

import Header, {INavButton} from './header'
import Footer from './footer'
import BackgroundImage from './backgroundImage';

const styles = ({ palette }: Theme) => createStyles({
    page: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        backgroundColor: palette.background.default
    },

    header: {
        flex: 1,
        paddingBottom: '15px'
    },

    backgroundImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        top: '0px',
        right: '0px'
    },

    footer: {
        marginTop: "5em",
    },

    contentClass: {
        flex: 1,
        zIndex: 2,
        marginLeft: "10%",
        marginRight: "10%",
    },

    '@media (max-width: 800px)': {
        contentClass: {
            marginLeft: "5%",
            marginRight: "5%",
        },
    },

    '@media (min-width: 1400px)': {
        contentClass: {
            marginLeft: "15%",
            marginRight: "15%",
        },
    },

    contentItem: {
        marginBottom: "0em",
        marginTop: "0em",
    }
});

interface IPageProps {
    classes: any;
    children: any[];
    backgroundImg?: string;
    navButtons: INavButton[];
}

class Page extends React.Component<IPageProps> {
    static defaultProps = {
        navButtons: new Array<INavButton>(),
    };

    render() {
        return (
            <>
                <div className={this.props.classes.page}>
                    <Header className={this.props.classes.header} navButtons={this.props.navButtons} />
                    <BackgroundImage imagePath={this.props.backgroundImg} className={this.props.classes.backgroundImage} />
                    <div className={this.props.classes.contentClass}>
                        {
                            map(this.props.children, (child) => {
                                return (
                                    <div className={this.props.classes.contentItem}>
                                        {child}
                                    </div>
                                )
                            })
                        }
                    </div>

                    <Footer className={this.props.classes.footer} />
                </div>
            </>
        )
    }
}

export default withStyles(styles)(Page);
