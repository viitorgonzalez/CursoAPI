import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';

interface IReq {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IReq): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productsExists = await productsRepository.findByName(name);

    if (productsExists) {
      throw new AppError('There is already one product with this name.');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
