using MyService as service from '../../srv/service';
annotate service.Patients with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'PatientID',
                Value : PatientID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PatientName',
                Value : PatientName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PatientAge',
                Value : PatientAge,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PatientPhone',
                Value : PatientPhone,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PatientCity',
                Value : PatientCity,
            },
            {
                $Type : 'UI.DataField',
                Value : Status,
                Label : 'Status',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Vistor',
            ID : 'Vistor',
            Target : 'patientsTovisits/@UI.LineItem#Vistor',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'PatientID',
            Value : PatientID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'PatientName',
            Value : PatientName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'PatientAge',
            Value : PatientAge,
        },
        {
            $Type : 'UI.DataField',
            Label : 'PatientPhone',
            Value : PatientPhone,
        },
        {
            $Type : 'UI.DataField',
            Label : 'PatientCity',
            Value : PatientCity,
        },
        {
            $Type : 'UI.DataField',
            Value : Status,
            Label : 'Status',
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View',
    },
);

annotate service.Visits with @(
    UI.LineItem #Vistor : [
        {
            $Type : 'UI.DataField',
            Value : DoctorID,
            Label : 'DoctorID',
        },
        {
            $Type : 'UI.DataField',
            Value : PatientID,
            Label : 'PatientID',
        },
        {
            $Type : 'UI.DataField',
            Value : VisitorID,
            Label : 'VisitorID',
        },
        {
            $Type : 'UI.DataField',
            Value : Total,
            Label : 'Total',
        },
        {
            $Type : 'UI.DataField',
            Value : VisitsDate,
            Label : 'VisitsDate',
        },
    ]
);

