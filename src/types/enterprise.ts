type ImageField = { id: string; url: string; label: string; eid: string };
export type Datasheet = { id: string; label: string; value: string; eid: string };

export type Enterprise = {
  id: string;
  name: string;
  type: string;
  desc: string;
  status: string;
  state: string;
  city: string;
  video: string;
  address: string;
  location_iframe: string;
  district_desc: string;
  datasheet: Datasheet[];
  banner: ImageField;
  banner_emphasis: ImageField;
  galleria: ImageField[];
  plans: ImageField[];
  differential: ImageField[];
  additional: (ImageField & { banner_include: boolean })[];
};

export type EnterprisePartial = Pick<
  Enterprise,
  'id' | 'state' | 'city' | 'banner_emphasis' | 'name' | 'type' | 'desc' | 'status'
>;
