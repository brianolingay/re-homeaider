import { ObjectId } from "mongodb";
import { InputType, Field } from "type-graphql";
import { GraphQLUpload } from "graphql-upload";
import { Readable } from "stream";

interface Upload {
  stream: Readable;
  filename: string;
  mimetype: string;
  encoding: string;
}

@InputType()
class CertificateObject {
  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => GraphQLUpload)
  file: Upload;
}

@InputType()
export class ProviderServiceInput {
  @Field()
  service: ObjectId;

  @Field({ nullable: true })
  description: string;

  @Field(() => [CertificateObject])
  certificates: CertificateObject[];
}
