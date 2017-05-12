import * as React from "react";
import { connect } from "react-redux";
import { PlaceholderComponent, DefaultComponentNames } from "mapguide-react-layout/lib/api/registry/component";

export interface ISampleLayoutTemplateProps {
    
}

export interface ISampleLayoutTemplateState {
    locale: string;
}

export interface ISampleLayoutTemplateDispatch {

}

export type SampleLayoutTemplateProps = Partial<ISampleLayoutTemplateProps & ISampleLayoutTemplateState & ISampleLayoutTemplateDispatch>;

export class SampleLayoutTemplate extends React.Component<SampleLayoutTemplateProps, object> {
    constructor(props: SampleLayoutTemplateProps) {
        super(props);
    }
    render(): JSX.Element {
        const { locale } = this.props;
        return <div style={{ width: "100%", height: "100%" }}>
            <PlaceholderComponent id={DefaultComponentNames.Map} locale={locale} />;
        </div>;
    }
}