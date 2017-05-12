import * as React from "react";
import { connect } from "react-redux";
import { PlaceholderComponent, DefaultComponentNames } from "mapguide-react-layout/lib/api/registry/component";
import { IApplicationState, ReduxDispatch } from "mapguide-react-layout/lib/api/common";

export interface ISampleLayoutTemplateProps {
    
}

export interface ISampleLayoutTemplateState {
    isBusy: boolean;
    locale: string;
}

export interface ISampleLayoutTemplateDispatch {

}

export type SampleLayoutTemplateProps = Partial<ISampleLayoutTemplateProps & ISampleLayoutTemplateState & ISampleLayoutTemplateDispatch>;

function mapStateToProps(state: IApplicationState) : Partial<ISampleLayoutTemplateState> {
    return {
        isBusy: state.viewer.busyCount > 0,
        locale: state.config.locale
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): ISampleLayoutTemplateDispatch {
    return {

    };
}

@connect(mapStateToProps, mapDispatchToProps)
export class SampleLayoutTemplate extends React.Component<SampleLayoutTemplateProps, any> {
    constructor(props: SampleLayoutTemplateProps) {
        super(props);
    }
    render(): JSX.Element  | null {
        const { locale, isBusy } = this.props;
        return <div style={{ width: "100%", height: "100%" }}>
            <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />;
        </div>;
    }
}