import * as React from 'react'

import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const img = '/images/bgImage.jpg';
export const backGroundImgHeight = "50vh";

const styles = ({palette}: Theme) => createStyles({
    root: {
        width: '100%',
        position: 'absolute',
        top: '0px',
        right: '0px',
    },
    image: {
        height:backGroundImgHeight,
        width: 'auto',
        maxHeight:backGroundImgHeight,
        zIndex: 1,
        overflow: "hidden"
    }
});

interface IBackgroundImageProps {
    classes: any;
    imagePath?: string
}

export class BackgroundImage extends React.Component<IBackgroundImageProps & React.HTMLAttributes<HTMLDivElement>> {
    render() {
        return (
            <div className={`${this.props.classes.root}`}>
                <img
                    className={`${this.props.classes.image}`}
                    src={this.props.imagePath || img} />
            </div>
        )
    }
}

export default withStyles(styles)(BackgroundImage);
